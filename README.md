# Restful API with MySQL : User Authentication + CRUD & Authentication JWT (Json Web Token)

## Technology Used

-   `bcryptjs: ^2.4.3`
-   `cors: ^2.8.5`
-   `dotenv: ^10.0.0`
-   `express: ^4.17.1`
-   `joi: ^17.4.2`
-   `jsonwebtoken: ^8.5.1`
-   `mysql2: ^2.3.3`
-   `nodemon: ^2.0.15`
-   `sequelize: ^6.9.0`
-   `sequelize-cli: ^6.3.0`

<br>

## Project Structure

<img src="./Project Structure.png">

<br>

## APIs Provided

| Methods     | Urls             |           Actions           |   Token    |
| :---------- | :--------------- | :-------------------------: | :--------: |
| POST        | /api/auth/signup |     SignUp new Account      |     -      |
| POST        | /api/auth/signin |      Login an Account       |     -      |
| GET         | /api/user/list   | Retrieve Users List Content | `Required` |
| GET         | /api/user/find   |    Retrieve User Content    | `Required` |
| PUT / PATCH | /api/user/{id}   |     Update User Content     | `Required` |
| DELETE      | /api/user/{id}   |     Delete User Content     | `Required` |

<br>

## Flow for SignUp & SignIn with JWT Authentication

Following diagram shows the flow that we will implement for the `User Registration`, `User Login`, and `Authenticate JWT` Processes.

<img src="./Flow for Signup & Login with JWT Authentication.png">

<br><br>

## APIs Specification

`https://www.getpostman.com/collections/1f14b750916ed2fefd28`
<br>

## `User Registration`

Request :

-   Method : `POST`
-   Endpoint : `/api/auth/signup`
-   Header :

    -   Content-Type : `application/json`
    -   Accept : `application/json`

     <br>

-   Body :

    ```json
    {
        "email": "string",
        "username": "string",
        "password": "string, hash"
    }
    ```

-   Response :

    ```json
    {
        "code": "number",
        "message": "string",
        "user": {
            "id": "string",
            "email": "string",
            "username": "string",
            "createdAt": "date-string"
        }
    }
    ```

    <br>

## `User Login`

Request :

-   Method : `POST`
-   Endpoint : `/api/auth/signin`
-   Header :

    -   Content-Type : `application/json`
    -   Accept : `application/json`

     <br>

-   Body :
    ```json
    {
        "username": "string",
        "password": "string, hash"
    }
    ```
-   Response :

    ```json
    {
        "code": "number",
        "message": "string",
        "user": {
            "id": "string",
            "email": "string",
            "username": "string",
            "createdAt": "date-string"
        }
    }
    ```

    <br>

## `User List`

#### `Require token`

Request :

-   Method : `GET`
-   Endpoint : `/api/user/list`
-   Header :

    -   Content-Type : `application/json`
    -   Accept : `application/json`
    -   x-auth-token : `string`

    <br>

-   Response :

    ```json
    {
        "code": "number",
        "message": "string",
        "user": [
            {
                "id": "string",
                "email": "string",
                "username": "string",
                "createdAt": "date-string"
            },
            {
                "id": "string",
                "email": "string",
                "username": "string",
                "createdAt": "date-string"
            }
        ]
    }
    ```

    <br>

## `Find User`

#### `Require token`

#### example: `/api/user/find?id=1`

Request :

-   Method : `GET`
-   Endpoint : `/api/user/find`
-   Query :

    -   id : `string`

-   Header :

    -   Content-Type : `application/json`
    -   Accept : `application/json`
    -   x-auth-token : `string`

    <br>

-   Response :

    ```json
    {
        "code": "number",
        "message": "string",
        "user": {
            "id": "string",
            "email": "string",
            "username": "string",
            "createdAt": "date-string"
        }
    }
    ```

    <br>

## `Update User`

#### `Require token`

Request :

-   Method : `PUT / PATCH`
-   Endpoint : `/api/user/{id}`
-   Header :

    -   Content-Type : `application/json`
    -   Accept : `application/json`
    -   x-auth-token : `string`

    <br>

-   Body :

    ```json
    {
        "email": "string",
        "username": "string",
        "password": "string, hash"
    }
    ```

-   Response :

    ```json
    {
        "code": "number",
        "message": "string"
    }
    ```

    <br>

## `Delete User`

#### `Require token`

Request :

-   Method : `DELETE`
-   Endpoint : `/api/user/{id}`
-   Header :

    -   Content-Type : `application/json`
    -   Accept : `application/json`
    -   x-auth-token : `string`

    <br>

-   Response :

    ```json
    {
        "code": "number",
        "message": "string"
    }
    ```

    <br>
