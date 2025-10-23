# DTech_FE - Refresh Token 마이그레이션 가이드

> **작성일**: 2025-01-23
> **적용 버전**: DTech_FE v2.0 (Refresh Token Support)

---

## 📋 목차

1. [변경 사항 요약](#변경-사항-요약)
2. [새로 추가된 파일](#새로-추가된-파일)
3. [수정된 파일](#수정된-파일)
4. [Breaking Changes](#breaking-changes)
5. [사용 방법](#사용-방법)
6. [테스트 시나리오](#테스트-시나리오)
7. [FAQ](#faq)

---

## 변경 사항 요약

DTech_BE의 **Refresh Token 인증 시스템**에 맞춰 프론트엔드를 전면 리팩토링했습니다.

### 주요 변경사항

| 항목 | 이전 | 현재 |
|------|------|------|
| **인증 방식** | 단일 JWT (7일) | Access Token (15분) + Refresh Token (7일) |
| **토큰 저장** | 쿠키 `token` | 쿠키 `accessToken` + HttpOnly `refreshToken` |
| **자동 갱신** | ❌ 불가능 | ✅ Axios Interceptor로 자동 갱신 |
| **에러 처리** | 단순 string | ✅ ErrorCode enum으로 구조화 |
| **인증 로직** | Redux Saga + 분산 | ✅ useAuth hook으로 중앙화 |
| **Side Effect** | ❌ 렌더링 중 dispatch | ✅ useEffect로 이동 |

---

## 새로 추가된 파일

### 1. `utils/types/errorTypes.ts`
```typescript
// Backend 에러 코드 타입 정의
export enum ErrorCode {
    ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_EXPIRED',
    REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
    // ... 등
}
```

**역할**: DTech_BE와 동일한 에러 코드 체계 구축

---

### 2. `utils/api/axiosInstance.ts`
```typescript
// Axios Interceptor로 자동 토큰 갱신
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Access Token 만료 시 자동 갱신
        }
    }
);
```

**핵심 기능**:
- ✅ 401 에러 시 자동으로 `/api/auth/refresh` 호출
- ✅ 토큰 갱신 중복 방지 (대기열 관리)
- ✅ Refresh Token 만료 시 자동 로그아웃

---

### 3. `utils/hooks/useAuth.ts`
```typescript
export const useAuth = () => {
    const login = async (credentials) => { /* ... */ };
    const logout = async () => { /* ... */ };
    const autoLogin = async () => { /* ... */ };

    return { login, logout, autoLogin, isAuthenticated };
};
```

**역할**:
- 인증 로직 중앙화
- Redux Saga 대신 async/await 사용
- 명확한 API 제공

---

### 4. `utils/api/auth/authApi.ts`
```typescript
// Refresh Token 지원 인증 API
export const fireLoginRequest = async (params) => { /* ... */ };
export const refreshAccessToken = async () => { /* ... */ };
export const fireLogoutRequest = async () => { /* ... */ };
```

**변경점**:
- `accessToken`으로 응답 구조 변경
- Axios Interceptor 사용으로 자동 인증 헤더 추가

---

## 수정된 파일

### 1. `pages/_app.tsx`

**이전 (문제점)**:
```typescript
// ❌ 렌더링 중 side effect
const MyApp = () => {
    if ((!authStore || !authStore.userName) && cookie.get('token')) {
        dispatch({ type: 'AUTH_SETTING_BY_TOKEN', ... });  // 렌더링 중 dispatch
    }
    // ...
}
```

**현재 (개선)**:
```typescript
const MyApp = () => {
    const { autoLogin } = useAuth();

    // ✅ useEffect로 이동
    useEffect(() => {
        const attemptAutoLogin = async () => {
            if (authStore?.userName) return;
            await autoLogin();
        };
        attemptAutoLogin();
    }, []);
    // ...
}
```

**개선 사항**:
- ✅ React 규칙 준수 (no side effects in render)
- ✅ 비동기 처리 명확화
- ✅ Refresh Token 자동 로그인 지원

---

### 2. `pages/login/index.tsx`

**이전**:
```typescript
// Redux Saga를 통한 로그인
dispatch({
    type: RCONST.AUTH_SETTING,
    userSetting: { userId, password },
    callbackFn: (data) => { /* ... */ }
});
```

**현재**:
```typescript
// useAuth hook 사용
const { login } = useAuth();

const userLogin = async () => {
    const result = await login({ userId, password });
    if (result.success) {
        router.push('/dashboard');
    }
};
```

**개선 사항**:
- ✅ async/await로 가독성 향상
- ✅ 에러 처리 명확화
- ✅ Validation 로직 통합

---

## Breaking Changes

### 1. 쿠키 이름 변경
```javascript
// ❌ 이전
cookie.get('token')

// ✅ 현재
cookie.get('accessToken')
```

### 2. 로그인 응답 구조 변경
```javascript
// ❌ 이전
{
    result: 'success',
    token: '...',
    name: '...',
    userId: '...'
}

// ✅ 현재
{
    success: true,
    accessToken: '...',
    user: {
        name: '...',
        userId: '...',
        userUID: '...',
        userProfileImg: '...'
    }
}
```

### 3. Redux Saga Auth Actions 변경 필요
```typescript
// store/authSlice.ts에서 변경 필요
// 'AUTH_SETTING' action이 새로운 payload 구조 지원해야 함
```

---

## 사용 방법

### 1. 로그인 구현
```typescript
import { useAuth } from '@utils/hooks/useAuth';

const LoginPage = () => {
    const { login } = useAuth();

    const handleLogin = async () => {
        const result = await login({ userId, password });
        if (result.success) {
            router.push('/dashboard');
        }
    };

    return <button onClick={handleLogin}>로그인</button>;
};
```

### 2. 로그아웃 구현
```typescript
const Header = () => {
    const { logout } = useAuth();

    return <button onClick={logout}>로그아웃</button>;
};
```

### 3. 인증 상태 확인
```typescript
const ProtectedPage = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return <div>Protected Content</div>;
};
```

### 4. API 호출 (자동 인증)
```typescript
import axiosInstance from '@utils/api/axiosInstance';

// Authorization 헤더 자동 추가됨
const fetchData = async () => {
    const response = await axiosInstance.get('/api/dashboard/getTeamSkills');
    return response.data;
};
```

---

## 테스트 시나리오

### ✅ 시나리오 1: 정상 로그인
1. 로그인 페이지에서 아이디/비밀번호 입력
2. 로그인 성공
3. `accessToken`이 쿠키에 저장됨
4. `refreshToken`이 HttpOnly 쿠키에 자동 저장됨
5. 대시보드로 리다이렉트

### ✅ 시나리오 2: Access Token 만료
1. 로그인 후 15분 경과
2. API 호출 시 401 에러 (ACCESS_TOKEN_EXPIRED)
3. **Axios Interceptor가 자동으로 `/api/auth/refresh` 호출**
4. 새 Access Token 발급 및 저장
5. 원래 API 요청 자동 재시도
6. 사용자는 아무것도 느끼지 못함 (Seamless)

### ✅ 시나리오 3: Refresh Token 만료
1. 로그인 후 7일 경과
2. API 호출 시 401 에러
3. Refresh Token 갱신 시도
4. 401 에러 (REFRESH_TOKEN_EXPIRED)
5. 자동으로 로그인 페이지로 리다이렉트

### ✅ 시나리오 4: 페이지 새로고침
1. 로그인 상태에서 F5 (새로고침)
2. `_app.tsx`의 `useEffect`에서 `autoLogin()` 실행
3. Refresh Token으로 새 Access Token 발급
4. Redux에 사용자 정보 복원
5. 로그인 상태 유지

### ✅ 시나리오 5: 로그아웃
1. 로그아웃 버튼 클릭
2. 서버에 `/api/auth/logout` 요청
3. Refresh Token 쿠키 삭제
4. 클라이언트 측 `accessToken` 삭제
5. Redux 상태 초기화
6. 로그인 페이지로 리다이렉트

---

## FAQ

### Q1: 기존 사용자는 어떻게 되나요?
**A**: 기존 `token` 쿠키는 무시됩니다. 다시 로그인해야 합니다.

### Q2: Redux Saga는 여전히 필요한가요?
**A**: 인증 관련 로직은 `useAuth` hook으로 대체되었습니다. 하지만 다른 기능(예: board, register)에서는 여전히 Saga를 사용할 수 있습니다.

### Q3: 로그인 없이 접근 가능한 페이지는?
**A**: `pages/login`, `pages/register`는 인증 없이 접근 가능합니다. 다른 페이지는 자동으로 로그인 페이지로 리다이렉트됩니다.

### Q4: Token이 탈취되면 어떻게 하나요?
**A**:
- Access Token: 15분 후 자동 만료
- Refresh Token: 서버에서 토큰 무효화 API 필요 (향후 구현 예정)

### Q5: 개발 중 토큰 만료 테스트는 어떻게 하나요?
**A**:
```typescript
// .env.local에서 만료 시간 조정
JWT_EXPIRE=1m  // 1분으로 설정하여 테스트
```

---

## 다음 단계

### 🚀 추가 구현 예정
- [ ] Token Revocation (강제 로그아웃)
- [ ] Refresh Token Rotation (보안 강화)
- [ ] Rate Limiting (Refresh API)
- [ ] 다중 디바이스 관리
- [ ] 토큰 사용 로깅

### 📚 참고 문서
- [DTech_BE FRONTEND_AUTH_GUIDE.md](../DTech_BE/FRONTEND_AUTH_GUIDE.md)
- [SENIOR_CODE_REVIEW.md](./SENIOR_CODE_REVIEW.md)

---

**구현 완료일**: 2025-01-23
**작성자**: Claude (Senior Developer Perspective)
