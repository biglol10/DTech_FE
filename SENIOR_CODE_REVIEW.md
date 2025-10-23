# DTech_FE 시니어 개발자 코드 리뷰

> 리뷰 날짜: 2025-10-23
> 리뷰어: Senior Developer Perspective
> 프로젝트: DTech App (팀 스킬 현황파악 및 정보공유 앱)

---

## 목차

1. [잘한 점 (Strengths)](#-잘한-점-strengths)
2. [개선이 필요한 점 (Critical Issues)](#️-개선이-필요한-점-critical-issues)
3. [구체적인 개선 제안](#-구체적인-개선-제안)
4. [우선순위별 개선 로드맵](#-우선순위별-개선-로드맵)
5. [학습 추천 사항](#-학습-추천-사항)
6. [총평](#-총평)

---

## 🎯 잘한 점 (Strengths)

### 1. **프로젝트 구조 및 설정**
- ✅ **절대 경로 alias 설정**: `@components`, `@utils` 등의 alias를 적절히 활용해 import 가독성을 높였습니다
- ✅ **TypeScript 도입**: 타입 안정성을 위해 TS를 사용한 점은 훌륭합니다
- ✅ **Storybook 구축**: 컴포넌트 문서화와 독립적인 개발 환경을 구축한 점이 인상적입니다
- ✅ **페이지별 레이아웃 분리**: `Component.PageLayout` 패턴으로 레이아웃을 관리한 점은 좋은 아키텍처입니다

### 2. **상태 관리**
- ✅ **Redux Toolkit + Saga 조합**: 비동기 처리를 위한 적절한 기술 선택입니다
- ✅ **관심사 분리**: slice와 saga를 기능별로 분리한 점이 좋습니다

### 3. **개발 경험**
- ✅ **코드 주석**: 각 파일마다 작업이력과 설명을 남긴 점은 협업에 도움이 됩니다

---

## ⚠️ 개선이 필요한 점 (Critical Issues)

### 1. **타입 안정성 문제** ⭐⭐⭐

**문제점:**
```typescript
// pages/_app.tsx:47-50
if ((!authStore || !authStore.userName || !authStore.userToken) && cookie.get('token')) {
    dispatch({
        type: 'AUTH_SETTING_BY_TOKEN',  // ❌ magic string
        token: cookie.get('token'),
        callbackFn: async (userId: string) => {
            initSocket(userId);
        },
    });
}
```

**개선 방향:**
```typescript
// Redux Toolkit을 사용하면서도 createAction을 활용하지 않음
// 타입 안전성을 위해 다음과 같이 개선 필요:

// saga/authSaga.ts
import { createAction } from '@reduxjs/toolkit';

export const authSettingByToken = createAction<{
    token: string;
    callbackFn: (userId: string) => void;
}>('AUTH_SETTING_BY_TOKEN');

// 사용처
dispatch(authSettingByToken({
    token: cookie.get('token')!,
    callbackFn: (userId) => initSocket(userId)
}));
```

**타입 문제가 많은 곳:**
- `store/rootReducer.ts:24` - `state: any`, `action: any` ❌
- `utils/appRelated/helperFunctions.ts:111` - `{ auth: IAuth }` 타입이 제대로 정의되지 않음
- `saga/authSaga.ts:29` - generator 함수의 반환 타입이 명시되지 않음

### 2. **상태 관리 아키텍처 혼재** ⭐⭐⭐

**문제점:**
```typescript
// Redux Toolkit의 slice를 사용하면서도
// Saga에서 plain action을 dispatch하는 혼재된 패턴

// authSaga.ts에서
yield put(authSetting(loginResult));  // ✅ RTK action
// vs
// _app.tsx에서
dispatch({ type: 'AUTH_SETTING', ... });  // ❌ plain action
```

**개선 방향:**
- **옵션 1**: Redux Toolkit만 사용 (createAsyncThunk 활용)
- **옵션 2**: Saga를 계속 사용하되, typed action creator만 사용
- **현재 문제**: RTK Slice의 action과 Saga의 action이 혼재되어 있어 혼란스러움

### 3. **_app.tsx의 Side Effect** ⭐⭐

**문제점:**
```typescript
// pages/_app.tsx:47-55
// 컴포넌트 렌더링 중 side effect 실행 ❌
const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
    // ...
    if ((!authStore || !authStore.userName) && cookie.get('token')) {
        dispatch({...});  // ❌ 렌더링 중 dispatch
    }
    // ...
}
```

**개선 방향:**
```typescript
const MyApp = ({ Component, pageProps }: ComponentWithPageLayout) => {
    const dispatch = useDispatch();

    // ✅ useEffect로 이동
    useEffect(() => {
        const token = cookie.get('token');
        if (token && !authStore?.userName) {
            dispatch(authSettingByToken({ token, callbackFn: initSocket }));
        }
    }, [authStore?.userName, dispatch]);

    // ...
}
```

### 4. **에러 핸들링 및 로딩 상태** ⭐⭐

**문제점:**
```typescript
// pages/dashboard/index.tsx:213-233
const enterSearch = useCallback(() => {
    setInputLoading(true);
    if (userToken) {
        comAxiosRequest({
            // ...
            successCallback: (response) => {
                // ...
            },
            failCallback: () => {
                toast['error'](<>{'데이터를 가져오지 못했습니다'}</>);  // ❌ 구체적인 에러 정보 없음
            },
        });
    }
    setInputLoading(false);  // ❌ 즉시 false로 설정 (비동기 처리 안됨)
}, [searchCondition.personname, searchCondition.skillset, userToken]);
```

**개선 방향:**
```typescript
const enterSearch = useCallback(async () => {
    setInputLoading(true);
    try {
        if (!userToken) throw new Error('인증 토큰이 없습니다');

        const result = await comAxiosRequest({
            // ...
        });

        if (result.status === 'success') {
            tempArr.current = result.response.data.filterdUsersList;
            setUserListData(result.response.data.filterdUsersList);
        } else {
            throw result.response;
        }
    } catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : '데이터를 가져오지 못했습니다';
        toast.error(errorMessage);
        console.error('Search error:', error);
    } finally {
        setInputLoading(false);  // ✅ finally에서 처리
    }
}, [searchCondition, userToken]);
```

### 5. **코드 중복** ⭐⭐

**문제점:**
```typescript
// pages/dashboard/index.tsx
// getServerSideProps와 useEffect에서 동일한 데이터 변환 로직 중복
// 82-123행과 394-420행이 거의 동일

const axiosDataCallback = useCallback((axiosData: any) => {
    const teamSkillCountObj2: any = {};
    // ... 100줄의 변환 로직
}, []);

// getServerSideProps에서 동일한 로직 반복
```

**개선 방향:**
```typescript
// utils/dashboard/transformers.ts
export const transformTeamSkillData = (axiosData: RawTeamSkillData): TransformedData => {
    if (!axiosData?.teamSkillCountObj) return getEmptyData();

    const teamSkillCountObj = Object.entries(axiosData.teamSkillCountObj)
        .reduce((acc, [key, skillData]) => {
            acc[key] = {
                SKILL_NM: skillData[0].TECH_NM,
                SKILL_CNT: skillData[0].TECH_CNT,
                USER_INFO: skillData.map(user => ({
                    USER_NM: user.USER_NM,
                    USER_UID: user.USER_UID,
                    // ...
                })),
            };
            return acc;
        }, {});

    return {
        teamSkillDashboard: axiosData.teamSkillDashboard,
        userDashboard: axiosData.userDashboard,
        teamSkillCountObj,
    };
};

// 사용
const data = transformTeamSkillData(axiosData);
```

### 6. **보안 이슈** ⭐⭐⭐

**문제점:**
```typescript
// utils/appRelated/helperFunctions.ts:97-102
cookie.get('token') && withAuth
    ? {
        headers: {
            authorizations: `Bearer ${cookie.get('token')}`,  // ❌ 'Authorization' 오타 (authorizations)
        },
    }
    : {}
```

**개선 사항:**
1. ❌ **헤더명 오타**: `authorizations` → `Authorization`
2. ⚠️ **XSS 취약점**: `react-quill` 사용 시 DOMPurify를 사용하긴 했지만, 일관성 있게 적용되지 않음
3. ⚠️ **토큰 저장**: 쿠키에 토큰을 저장하는 것은 좋지만, `httpOnly`, `secure` 플래그 확인 필요

### 7. **성능 최적화 부족** ⭐⭐

**문제점:**
```typescript
// pages/dashboard/index.tsx:142-166
const data = {
    labels: !_.isEmpty(customObj.teamSkillDashboard)
        ? customObj.teamSkillDashboard.map((item) => item.TECH_NM)
        : [''],  // ❌ useMemo로 감싸지 않음
    datasets: [...]
};

// 188-202: options3는 useMemo로 감쌌지만, data는 안 감쌈
```

**개선 방향:**
```typescript
const chartData = useMemo(() => ({
    labels: customObj.teamSkillDashboard?.map(item => item.TECH_NM) ?? [],
    datasets: [{
        label: '인원',
        data: customObj.teamSkillDashboard?.map(item => item.TECH_CNT) ?? [],
        backgroundColor: CHART_COLORS.background,
        borderColor: CHART_COLORS.border,
    }],
}), [customObj.teamSkillDashboard]);
```

**추가 성능 이슈:**
- `pages/dashboard/index.tsx:345-362` - PersonCard를 map으로 렌더링할 때 React.memo 미사용
- dynamic import는 ModalPopup에만 적용되어 있음 (다른 무거운 컴포넌트에도 적용 필요)

### 8. **테스트 부재** ⭐⭐⭐

```json
// package.json:7
"test": "echo \"Error: no test specified\" && exit 1"
```

- 단위 테스트, 통합 테스트가 전혀 없음
- Storybook이 있지만 interaction test 미구현

---

## 🔧 구체적인 개선 제안

### 1. **상태 관리 현대화**

**현재:**
```typescript
// Redux Toolkit + Saga 혼재
```

**개선안 A: RTK Query 도입**
```typescript
// api/dashboardApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BE_BASE_URL,
        prepareHeaders: (headers) => {
            const token = cookie.get('token');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTeamSkills: builder.query<TeamSkillsResponse, void>({
            query: () => '/api/dashboard/getTeamSkills',
            transformResponse: transformTeamSkillData,
        }),
        getUserSkillFilter: builder.query<UserSkillResponse, FilterParams>({
            query: (params) => ({
                url: '/api/dashboard/getUserSkillFilter',
                method: 'POST',
                body: params,
            }),
        }),
    }),
});

export const { useGetTeamSkillsQuery, useGetUserSkillFilterQuery } = dashboardApi;
```

**개선안 B: React Query 도입 (더 권장)**
```typescript
// hooks/queries/useDashboard.ts
import { useQuery, useMutation } from '@tanstack/react-query';

export const useTeamSkills = () => {
    return useQuery({
        queryKey: ['teamSkills'],
        queryFn: async () => {
            const result = await comAxiosRequest({
                url: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/dashboard/getTeamSkills`,
                requestType: 'post',
            });
            if (result.status === 'error') throw result.response;
            return transformTeamSkillData(result.response.data);
        },
        staleTime: 5 * 60 * 1000, // 5분
    });
};

// 사용
const { data, isLoading, error } = useTeamSkills();
```

### 2. **컴포넌트 분리 및 재사용성 개선**

**현재:**
```typescript
// dashboard/index.tsx - 435줄의 거대한 컴포넌트
```

**개선:**
```typescript
// pages/dashboard/index.tsx
const Dashboard = () => {
    const { data, isLoading } = useTeamSkills();

    return (
        <>
            <DashboardHeader data={data} />
            <TeamSkillOverview data={data} />
            <UserList />
        </>
    );
};

// components/dashboard/UserList.tsx
const UserList = () => {
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const { data } = useUserSkillFilter(filters);

    return (
        <>
            <UserFilters filters={filters} onChange={setFilters} />
            <UserGrid users={data} />
        </>
    );
};
```

### 3. **에러 바운더리 도입**

```typescript
// components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        // 에러 로깅 서비스로 전송 (Sentry 등)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || <ErrorFallback error={this.state.error} />;
        }
        return this.props.children;
    }
}

// _app.tsx에서 사용
<ErrorBoundary>
    <Component {...pageProps} />
</ErrorBoundary>
```

### 4. **Custom Hook 활용**

```typescript
// hooks/useAuth.ts
export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);
    const { init: initSocket } = useSocket();

    useEffect(() => {
        const token = cookie.get('token');
        if (token && !auth?.userName) {
            dispatch(authSettingByToken({
                token,
                callbackFn: (userId) => initSocket(userId),
            }));
        }
    }, [auth?.userName, dispatch, initSocket]);

    const login = useCallback(async (credentials: LoginCredentials) => {
        // 로그인 로직
    }, [dispatch]);

    const logout = useCallback(() => {
        cookie.remove('token');
        dispatch(authReset());
    }, [dispatch]);

    return { auth, login, logout, isAuthenticated: !!auth?.userName };
};
```

---

## 📊 우선순위별 개선 로드맵

### 🔴 High Priority (즉시 개선)
1. **보안 이슈**: Authorization 헤더명 수정
2. **타입 안정성**: `any` 타입 제거, action creator 타입 정의
3. **_app.tsx side effect**: useEffect로 이동

### 🟡 Medium Priority (2-4주)
1. **상태 관리 현대화**: React Query 또는 RTK Query 도입
2. **에러 핸들링**: Error Boundary, 전역 에러 처리
3. **테스트 도입**: Jest + React Testing Library 셋업

### 🟢 Low Priority (유지보수 과정에서)
1. **성능 최적화**: useMemo, React.memo, code splitting
2. **컴포넌트 리팩토링**: 거대한 컴포넌트 분리
3. **코드 중복 제거**: 유틸 함수 공통화

---

## 💡 학습 추천 사항

1. **TypeScript 심화**: Generic, Utility Types, Type Guards
2. **React 현대적 패턴**: Server Components (Next.js 13+), Suspense
3. **상태 관리**: React Query의 캐싱 전략, optimistic updates
4. **테스팅**: TDD 방법론, E2E 테스트 (Playwright)
5. **성능**: React DevTools Profiler, Lighthouse 활용
6. **보안**: OWASP Top 10, JWT 베스트 프랙티스

---

## 🎓 총평

주니어 레벨에서 개발한 프로젝트치고는 **상당히 잘 구현**되었습니다. 특히:
- TypeScript, Redux Toolkit 등 현대적인 기술 스택 활용
- Storybook을 통한 컴포넌트 문서화
- 절대 경로를 통한 깔끔한 import 구조

다만 시니어 레벨로 성장하기 위해서는:
- **타입 안정성**을 더욱 강화하고
- **아키텍처적 일관성**을 유지하며
- **테스트와 에러 핸들링**을 체계화하는 것이 필요합니다

이 프로젝트를 리팩토링하면서 위의 개선사항들을 하나씩 적용해보면 실력 향상에 큰 도움이 될 것입니다!

---

## 📚 참고 자료

- [TypeScript 공식 문서 - Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [React Query 공식 문서](https://tanstack.com/query/latest/docs/react/overview)
- [Redux Toolkit - RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Next.js - Data Fetching](https://nextjs.org/docs/pages/building-your-application/data-fetching)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

**리뷰 완료일**: 2025-10-23
**다음 리뷰 권장일**: 리팩토링 후 3개월 이내
