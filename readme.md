#  Moodcar - Backend
>2022-1 SW캡스톤디자인 Team Project - 감정 일기 서비스 Moodcar   
[Moodcar Github](https://github.com/MoodCar)
<br/>

## Introduction
추후에 작성 예정.

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
1. Nginx가 메인 서버의 앞단에서 리버스 프록시로 작동
2. Node.js Express를 사용하여 메인 API서버 구현
3. 데이터베이스로 MySQL 사용. 배포용 데이터베이스와 테스트용 데이터베이스를 분리 운영
4. Colab을 통한 모델 학습, Flask를 사용해 API형태로 배포
<br/>

## CI/CD
<img src="./.github/images/cicd diagram.jpeg">
<br/>

##  API 문서
[Moodcar - APIs](http://ec2-3-39-17-18.ap-northeast-2.compute.amazonaws.com/api-docs) (Swagger)