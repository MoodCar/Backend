---
description: 서비스 사용자 관련 API입니다.
---

# Users

{% swagger method="get" path="" baseUrl="http://3.39.17.18" summary="전체 사용자 정보 조회" %}
{% swagger-description %}
서비스에 등록된 전체 사용자 정보를 조회합니다.  
{% endswagger-description %}

{% swagger-response status="200: OK" description="전체 사용자 정보를 가져옴" %}
```javascript
{
    //response
    "id":"id_number",
    "email" : "email_value",
    "password":"password_value",
    "location":"location_value",
    "auth":"auth_number",
    "reg_date":"time"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="delete" path="/users/:id" baseUrl="http://3.39.17.18" summary="특정 사용자 정보 삭제" %}
{% swagger-description %}
서비스에 등록된 특정 사용자의 정보를 삭제합니다.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Int" required="true" %}
검색할 유저의 ID Value ( 식별자)
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response Example
    "fieldCount": 0,
    "affectedRows": 1,
    "insertId": 0,
    "serverStatus": 2,
    "warningCount": 0,
    "message": "",
    "protocol41": true,
    "changedRows": 0
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="patch" path="/users/:id" baseUrl="http://3.39.17.18" summary="특정 사용자 정보 수정" %}
{% swagger-description %}
서비스에 등록된 특정 사용자의 정보(비밀번호, 위치)를 수정합니다.
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Int" required="true" %}
수정할 유저의 ID Value ( 식별자)
{% endswagger-parameter %}

{% swagger-parameter in="body" name="password" type="Sting" required="false" %}
 수정할 비밀번호
{% endswagger-parameter %}

{% swagger-parameter in="body" name="location" type="String" %}
수정할 주소
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
    "password": "password_value",
    "location": "location_value"
}
```
{% endswagger-response %}
{% endswagger %}
