<a href="https://dtech-app.vercel.app/">
    <img src="https://dcx-tech.s3.ap-northeast-2.amazonaws.com/chat/96eef3d803cc0f3318f93503b.png" alt="Aimeos logo" title="Aimeos" align="right" height="80" />
</a>

# DTech App

<img width="1720" alt="image" src="https://user-images.githubusercontent.com/46738034/197947114-86c6a4a6-850e-4d4e-b45c-2da9984e942f.png">

<br/>

:star: 개발기간 - 2022/06/16 ~ 2022/11/01

## Introduction [📖](#introduction)

**DTech App**은 팀 스킬 현황파악 및 정보공유가 원활하게 이뤄질 수 있도록 도와주는 앱입니다. <br/> 모르는게 있어 어디에 질문할지 모르거나 팀에 새로운 인원이 많이 들어오면서 누가 어떤 스킬셋이나 도메인을 갖고 있는지 몰라 답답한 상황이 있었을 겁니다. 이를 해결하기 위해 팀 스킬 현황을 파악할 수 있는 [DTech-App](https://dtech-app.vercel.app/)을 만들었으며 Slack 앱과 비슷한 구조를 가지고 있습니다.

---

## Table of contents[![](<img alt="Source" width="20px" src="https://www.svgrepo.com/show/157475/website.svg"/>)](#table-of-contents)

1. [제공하는 기능](#features)
2. [기술스택](#techs)
    - [Front-end](#techs_FE)
    - [Back-end](#techs_BE)
    - [Infra](#techs_INFRA)
3. [Composition](#composition)
4. [Software build](#software-build)
5. [Software integration](#software-integration)
    - [Multicast router](#mulitcast-router)
    - [Logging service](#logging-service)
    - [Development](#development)
6. [Use cases and benefits](#use-cases-and-benefits)
    - [Distributes solutions](#distributed-solution)
    - [Driverless devices](#driverless-devices)
    - [Real-time solutions](#real-time-solutions)
    - [Digital twin](#digital-twin)
    - [Simulation and test automations](#simulation-and-test-automations)
7. [Examples](#examples)
8. [Licensing](#licensing)
9. [Call for action](#call-for-action)

---

## 제공하는 기능[![](<img alt="Source" width="20px" src="https://www.svgrepo.com/show/157475/website.svg"/>)](#features)

##### A. 대시보드

-   팀 스킬 현황 차트 통계, 스킬 별 인원 테이블 정보.
-   유저 검색, 조건 별 필터링, 프로필 조회, 대화걸기.

##### B. 채팅

-   실시간 개인 채팅, 그룹 채팅.
-   이미지 전송, 링크 메타데이터 제공, 이미지 확대, 이미지 추가, 이미지 붙여넣기.
-   날짜 별로 표시, XX님이 입력중입니다 표시.

##### C. 게시판

-   여기에 정보 입력해주세요!!!!!! (장보영 선임님)

##### D. About

-   프로젝트 정보 표시.
-   사용한 기술 스택, 패키지에 대한 list 표시

##### E. Layout

-   미수신 채팅 리스트가 있을 경우 사용자 이름에 bold 표시.
-   실시간으로 온라인/오프라인 유저 표시.
-   채팅 유저 검색, 대화걸기, 대화방 만들기.

---

## 기술스택 [🏗️](#techs)

| 분류                                                    | 내용                                                                                                                                                                                                                     |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Front-end [📃](#techs_FE) <br/> (기술스택 / 패키지)** | - React, Nextjs, Typescript, Redux-Toolkit, Redux-saga, Socket, Module SASS/SCSS <br/> - Redux-toolkit, Redux-Saga, Lodash, Chartjs, React-toastify, React-Quill, Axios, Classnames, Dayjs, Semantic-ui-react, Socket-IO |
| **Back-end [📃](#techs_BE) <br/> (기술스택 / 패키지)**  | - Express, Typescript, Socket, AWS-S3, MYSQL <br/> - Express, Socket, Axios, BcryptJs, Multer-s3, Mysql, Tsconfig-paths                                                                                                  |
| **인프라 [📃](#techs_INFRA)**                           | Docker, AWS - EC2, S3, Cloudfront, ACM, DMS                                                                                                                                                                              |

---
