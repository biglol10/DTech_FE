```diff
!   @경로 : utils/api/auth/loginRequest
!   @설명 : 로그인 관련 함수 모음
```

---

> [함수명] => fireLoginRequest  
> [parameter] => { userId: string, password: string }  
> [기능] => 아이디와 비밀번호를 이용해 login

<br/>

> [함수명] => fireTokenRequest  
> [parameter] => token: string  
> [기능] => token값을 이용해 login정보 받아오는 함수

<br/><br/>

```diff
!   @경로 : utils/appRelated/helperFunctions
!   @설명 : 부가적인 기능을 제공하는 함수 모음
```

---

> [함수명] => generateUID  
> [parameter] => null  
> [기능] => 20자리 uniqueID 생성

<br/>

> [함수명] => generateImageUID  
> [parameter] => null  
> [기능] => 25자리 uniqueID 생성 (이미지 용도)

<br/><br/>

```diff
!   @경로 : utils/constants/reducerConstants
!   @설명 : Redux-Saga 타입 모음

!   @경로 : utils/constants/techs
!   @설명 : 스킬 이미지 binary형태 모음

!   @경로 : utils/constants/uiConstants
!   @설명 : UI 관련 상수 모음
```

---

<br/><br/>

```diff
!   @경로 : utils/hooks/customHooks
!   @컴포넌트 : useModal, useSocket
!   @설명 : 프로젝트 관련 custom hooks
```

---

> [함수명] => useModal  
> [기능1] => modalState = modal상태 객체  
> [기능2] => handleModal = modal제어 함수

<br/>

> [함수명] => useSocket  
> [기능1] => init = 소캣 연결 및 소캣객체 전역으로 저장  
> [기능2] => disconnect = 소캣 연결 해제 및 소캣객체 삭제

<br/><br/>

```diff
!   @경로 : utils/styleRelated/stylehelper
!   @설명 : SCSS 스타일 및 변수관련 함수
```

---

> [함수명] => inputElCommStyle  
> [parameter] => (spacing: number, textAlign: 'left' | 'right' | 'center', stretch: boolean)  
> [기능] => 스타일 관련 함수 (scss파일에서 var(--spacing), var(--align)로 접근가능)

<br/>

> [함수명] => customStyleObj  
> [parameter] => (spacing: number, param: {name: string, value: 'string' | 'number'}[])  
> [기능] => scss파일에 넘길 변수 지정 함수

<br/><br/>

```diff
!   @경로 : utils/types/commAndStoreTypes
!   @설명 : 공통 컴포넌트 typescript 타입 모음

!   @경로 : utils/types/commAndStoreTypes
!   @설명 : 공통 컴포넌트를 제외한 컴포넌트들의 typescript 타입 모음
```

```diff
!   @경로 : utils/api/auth/register
!   @설명 : 회원가입 관련 함수 모음
```

---

> [함수명] => getTechListRequest.ts  
> [parameter] => { }  
> [기능] => 기술 리스트 return

<br/>

> [함수명] => idCheckRequest.ts  
> [parameter] => {userId:string}  
> [기능] => userId값이 존재하는지 확인

<br/>

> [함수명] => registerRequest.ts  
> [parameter] => {userId:string, name:string, passwd:string, team:string, title:string, phonenum:string, detail : string, tech_list:string}  
> [기능] => 회원가입 정보 등록

<br/>

> [함수명] => teamListRequest.ts  
> [parameter] => {}  
> [기능] => 팀 리스트 return

<br/>

> [함수명] => sendUserImgRequest.ts  
> [parameter] => {formData}  
> [기능] => 프로필 이미지 s3등록

<br/><br/>
