<a href="https://dtech-app.vercel.app/">
    <img src="https://dcx-tech.s3.ap-northeast-2.amazonaws.com/chat/96eef3d803cc0f3318f93503b.png" alt="Aimeos logo" title="Aimeos" align="right" height="80" />
</a>

# DTech App

<img width="1720" alt="image" src="https://user-images.githubusercontent.com/46738034/197947114-86c6a4a6-850e-4d4e-b45c-2da9984e942f.png">

<br/>

:star: 개발기간 - 2022/06/16 ~ 2022/11/01

**DTech App**은 팀 스킬 현황파악 및 정보공유가 원활하게 이뤄질 수 있도록 도와주는 앱입니다. <br/> 모르는게 있어 어디에 질문할지 모르거나 팀에 새로운 인원이 많이 들어오면서 누가 어떤 스킬셋이나 도메인을 갖고 있는지 몰라 답답한 상황이 있었을 겁니다. 이를 해결하기 위해 팀 스킬 현황을 파악할 수 있는 [DTech-App](https://dtech-app.vercel.app/)을 만들었으며 Slack 앱과 비슷한 구조를 가지고 있습니다.

<br/>

---

## Table of contents[![](<img alt="Source" width="20px" src="https://www.svgrepo.com/show/157475/website.svg"/>)](#table-of-contents)

1. [💻 제공하는 기능](#-제공하는-기능)
2. [📝 프로젝트 기술스택](#-프로젝트-기술스택)
    - [Front-end](#-프로젝트-기술스택)
    - [Back-end](#-프로젝트-기술스택)
    - [Infra](#-프로젝트-기술스택)
3. [🌱 프로젝트 개발자](#-프로젝트-개발자)
4. [🚧 아키텍쳐](#-아키텍쳐)
5. [📃 프로젝트 화면](#-프로젝트-화면)

<a href="http://43.200.144.147:6006/?path=/story/example-introduction--page" target="_blank">Storybook 링크</a>

<br/>

---

<br/>

## 💻 제공하는 기능

##### A. 대시보드

-   팀 스킬 현황 차트 통계, 스킬 별 인원 테이블 정보.
-   유저 검색, 조건 별 필터링, 프로필 조회, 대화걸기.

##### B. 채팅

-   실시간 개인 채팅, 그룹 채팅.
-   이미지 전송, 링크 메타데이터 제공, 이미지 확대, 이미지 추가, 이미지 붙여넣기.
-   날짜 별로 표시, XX님이 입력중입니다 표시.

##### C. 게시판

-   게시물 조회 및 등록
-   이미지 등록, 이미지 슬라이드 보기, 이미지 확대, 댓글 및 좋아요
-   게시물 정렬, 기술 별 필터링 조회

##### D. About

-   프로젝트 정보 표시.
-   사용한 기술 스택, 패키지에 대한 list 표시

##### E. Layout

-   미수신 채팅 리스트가 있을 경우 사용자 이름에 bold 표시.
-   실시간으로 온라인/오프라인 유저 표시.
-   채팅 유저 검색, 대화걸기, 대화방 만들기.

##### F. 로그인 / 회원가입

-   이메일, 비번 Regex 체크
-   아이디 중복 체크, 자기소개 및 스킬셋 등록
-   프로필 이미지 등록 (미등록 시 Slack처럼 랜덤 프로필 부여)

<br/>

---

<br/>

## 📝 프로젝트 기술스택

| 분류                                       | 내용                                                                                                                                                                                                                     |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Front-end 🏁 <br/> (기술스택 / 패키지)** | - React, Nextjs, Typescript, Redux-Toolkit, Redux-saga, Socket, Module SASS/SCSS <br/> - Redux-toolkit, Redux-Saga, Lodash, Chartjs, React-toastify, React-Quill, Axios, Classnames, Dayjs, Semantic-ui-react, Socket-IO |
| **Back-end 🏁 <br/> (기술스택 / 패키지)**  | - Express, Typescript, Socket, AWS-S3, MYSQL <br/> - Express, Socket, Axios, BcryptJs, Multer-s3, Mysql, Tsconfig-paths                                                                                                  |
| **인프라 🏁**                              | Docker, AWS - EC2, S3, Cloudfront, ACM, RDS                                                                                                                                                                              |

<br/>

---

<br/>

## 🌱 프로젝트 개발자

-   👨🏻‍💻 [리더] 변지욱: https://github.com/biglol10
    -   Lead Front-end, Back-end, Architecture
-   👨🏻‍💻 [팀원] 장보영: https://github.com/spaceman8192
    -   Front-end, Back-end

<br/>

---

<br/>

## 🚧 아키텍쳐

![image](https://user-images.githubusercontent.com/46738034/198954117-67476c8b-7662-4361-ab6e-c6faa50e6950.png)

<br/>

---

## 📃 프로젝트 화면

1️⃣ 대시보드
<img width="1720" alt="image" src="https://user-images.githubusercontent.com/46738034/197947114-86c6a4a6-850e-4d4e-b45c-2da9984e942f.png">

2️⃣ 채팅
<img width="1721" alt="image" src="https://user-images.githubusercontent.com/46738034/197951505-3de34d65-0d4c-46bb-b0c4-6ab0104ef39d.png">

3️⃣ 게시판
<img width="1712" alt="image" src="https://user-images.githubusercontent.com/46738034/197962600-be2fd39b-6b7a-4c83-9ea5-8b371795588b.png">

4️⃣ About
<img width="1716" alt="image" src="https://user-images.githubusercontent.com/46738034/197962819-cf76cd71-0289-47eb-9212-db112f47497b.png">
