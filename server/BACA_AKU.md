# API Documentation

Base URL = http://locahost:3000/



## Users API



| HTTP | Endpoint          | Headers                                              | Body                                                         | Description          |
| ---- | ----------------- | ---------------------------------------------------- | ------------------------------------------------------------ | -------------------- |
| POST | /user/signup      | none                                                 | Email : String<br />Password : String<br />Fullname : String<br /> | Sign Up a new user   |
| POST | /user/signin      | none                                                 | email : String<br />Password : String                        | Sign In User         |
| POST | /user/changephoto | Content-Type: multipart/formdata<br />Token : String | photo: file                                                  | Change Photo Profile |



## Scheduler API

| HTTP   | Endpoint            | Headers        | Body                                                         | Description      |
| ------ | ------------------- | -------------- | ------------------------------------------------------------ | ---------------- |
| POST   | /schedule/create    | token : String | name: String<br />description:String<br />startTime: DATE<br />endTIme: DATE | Set New Schedule |
| DELETE | /schedule/delete    | token: String  | id: String                                                   | Delete Schedule  |
| PATCH  | /schedule/update:id | token:String   | name: String,<br />description: String<br />startTime: Date<br />endTime: Date | Update schedule  |
|        |                     |                |                                                              |                  |





## Request & Response Details

### Users

- **Sign up**

  method : POST

  endpoint : /user/signup

  

  **Request**

  - body

    ```
    email: String , <Required>
    password : String, <Required>
    fullname: String, <Required>
    ```

  **Success Response**

  ```json
  {
  	"email": "smartcage@gmail.com",
    "password": "V5MUfXvUrP9XItkuxzfziOqjRTqWYsqusNDUsORJ7Xqae9OrU33e2",
    "fullname" : "Smart Cage Andalanku",
    "photo_path" : "gcs.studio-img.jpg"
  }
  ```

  

- **Sign In**

  Method : POST

  endpoint : /user/signin

  

  **Request**

  - body

    ```
    email : String, <required>
    password : String, <required>
    ```

  **Success Response**

  ```json
  {
  	"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNGY4NTEyNDVlNmZiMzlmNTAwN2NiYSIsIm5hbWUiOiJ5b2dhIiwiZW1haWwiOiJ5b2dhQG1haWwuY29tIiwiaWF0IjoxNTY1NTE2NjMyfQ.FeFWVOZuT1TBLszVY5gXS_XST4uUDA-PO8uM6KVPJJw"
  }
  ```

  

- **Change Photo**

  Method : POST

  endpoint : /user/changephoto

  

  **Request**

  - multipart/formdata

    ```
    photo : image.jpeg
    ```

  **Success Response**

  ```json
  {
  	"message" : "Succesfully change photo"
  }
  ```

  

