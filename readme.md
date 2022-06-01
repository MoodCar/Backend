#  Moodcar - Backend

<div align="center">
<img src="./.github/images/logo4.png"><br/>

### 2022-1 SW캡스톤디자인 Team Project
### 감정 일기 서비스 Moodcar   
[Moodcar Github](https://github.com/MoodCar)
<br/>
</div>

## Introduction
바쁜 현대인들은 하루를 돌아보는 시간을 갖는 것이 쉽지 않다. 일기를 쓰면서 하루를 되돌아 볼 수는 있지만, 아날로그 일기의 경우 어떤 날에 무슨 일이 있었고 어떤 감정을 느꼈는지 되돌아보기 위해서는 일기 전체를 읽어봐야 하므로 시간이 많이 소모된다는 단점이 있다. 또한 일기를 작성할 때 자신이 느낀 감정을 정확하게 파악하지 못할 때도 있다.

감정 일기 서비스 Moodcar는 인공지능을 이용해 일기 내용으로 감정 분포 및 주요 활동을 자동으로 추론한다. 그리고 달력에 보기 좋게 기록한다. 더 나아가 사용자가 느낀 감정에 따라 콘텐츠(음악, 상담사 등)를 추천해줌으로써, 사용자가 감정을 다스릴 수 있게 도와준다.
<br/>



## Environment
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) 
---
| name    | version   
| ------- | --------- 
| Node.js | 16.14.0   
| Ubuntu  | 20.04.4 LTS 
| Mysql   | 8.0.28 
| Docker  | 20.10.16  
| Nginx   | 1.18.0   
---
<br/>

## System Architecture
대략적인 Architecture 구조도입니다.
<img src="./.github/images/architecture diagram.jpeg">
1. Nginx가 메인 서버의 앞단에서 리버스 프록시 및 로드밸런서로 작동
2. Node.js Express를 사용하여 메인 API서버 구현
3. 데이터베이스로 MySQL 사용. 배포용 데이터베이스와 테스트용 데이터베이스를 분리 운영
4. 별도의 머신러닝 서버를 구축해 학습된 모델을 Flask를 통해 API형태로 배포
<br/>

## CI/CD
<img src="./.github/images/cicd diagram.jpeg">

1. NGINX와 Docker Compose를 활용한 Blue-Green 방식의 무중단 배포
2. Mocha와 Supertest를 이용한 API 테스트
3. Jenkins를 이용한 빌드 및 테스트 자동화
4. Slack, Github, Jenkins 연동을 통한 이슈관리 및 모니터링
5. 배포 시 SwaggerUI를 통한 API문서 자동 생성
<br/>

##  API 문서
[Moodcar - APIs](http://ec2-3-39-17-18.ap-northeast-2.compute.amazonaws.com/api-docs) (Swagger)