# node-image-restapi

## Requirements
- Install node js version `20.11.1`. Can download it from `https://nodejs.org/en/download`.
NOTE: Incase you have `node version manager (nvm)` you can download the node version using
`nvm install v20.11.1`. Make sure to run `nvm list` to check if node version `20.11.1` is been used.

- Install nodemon by running `npm install -g nodemon`.
- Install `postman` or `thunder client visual studio extension` to test api.

- Create `unsplash` developer account to access development api from  `https://unsplash.com/developers`. Once account is created make sure to create a `App` in your account to get the needed keys for the node rest api project.
- Have an email the you can use to send password reset link on email service.

## Instructions

- Clone the app by copying the project url.
- On your code editor open the project folder.
- Once folder is open open terminal and go to develop branch by typing: `git checkout develop`
- Once on the develop branch make sure to have meet the requirements to run the project and then
run the following command to install dependencies: `npm install`
- Once dependencies have been installed create a `.env` file in the project root. Env file should have:

        PORT=3001
        DB=mongodb
        DB_URI=value to replace #Make sure to specify database on the connection url.

        JWT_TOKEN_SECRET= 12345
        PASSWORD_RESET_JWT_TOKEN_SECRET= 1234
        TOKEN_DURATION=1h #1 hour = 1h, 1 minute = 1m, 1 second = 1s
        PASSWORD_RESET_TOKEN_DURATION=20m #1 hour = 1h, 1 minute = 1m, 1 second = 1s
        PASSWORD_SALT=10

        MAILER_SERVICE=hotmail #Can be hotmail or gmail.
        EMAIL=value to replace #Make sure the email provider matches the mailer servince env.
        PASSWORD=value to replace

        UNSPLASH_API_URL=https://api.unsplash.com
        UNSPLASH_API_ACCESS_KEY=value to replace #Check requirements for steps to get key.

        AWS_ACCESS_KEY= value to replace
        AWS_SECRET_KEY= value to replace
        AWS_BUCKET_NAME= value to replace

        DOWNLOAD_PATH=/Downloads #Specify folder in which s3 image is going to download.

NOTE: Make sure to replace `value to replace` on env file.
- Before starting project make sure nothing is running on the select `PORT`.
- Once everything is setup run the following command to start rest api: `npm start`.

# REST API
The rest api instructions is described below.

## Sign Up

`Checks if user exist by using username and email.`

`POST /signUp`

        http://localhost:3001/signIn

### Response if Success
        "message": "Sign Up Successful",
        "code": 200,
        "data": {}

        {}

`Payload:`
        {
        "username": USER_NAME,
        "email": EMAIL,
        "password": PASSWORD,
        }

### Response if Fails
            {
                "Status": "User already exist."
            }


## Sign In

`isEmail flag is true user must be email if false user must be username.`

`GET /signIn`

        http://localhost:3001/signIn

### Response if Success
        Status: "Sucess"
        Token: <HERE_SHOULD_HAVE_A_JWT_TOKEN>

        {}

`Payload:`
        {
        "user": USER_NAME || USER_EMAIL,
        "password": PASSWORD,
        "isEmail": false
        }

### Response if Fails
        {
            "Status": "Unsucess",
            "error": {
                "credentials": [
                    "Invalid credentials!"
                ]
            }
        }


## Forgot Password

`isEmail flag is true user must be email if false user must be username.`

`GET /forgotPassword`

        http://localhost:3001/forgotPassword

### Response if Success
        "Status": "Success",
        "Token": <HERE_SHOULD_HAVE_A_JWT_TOKEN>

        {}

`Payload:`
        {
        "user": USER_NAME || USER_EMAIL,
        "isEmail": false
        }

### Response if Fails
            {
                "Status": 'Unsuccessful',
                "error": 'No match for user.'
            }

## Reset Password

`isEmail flag is true user must be email if false user must be username.`
`NOTE: Make sure to use token obtained from forgotPassword email. Should be the long string on the url sended to email.`

`PUT /resetPassword`

        http://localhost:3001/resetPassword

### Headers

`Authorization`: JWT_TOKEN_SENDED_TO_EMAIL_URL

### Response if Success
        "Status": "Success"

        {}

`Payload:`
        {
        "user": USER_NAME || USER_EMAIL,
        "password": NEW_PASSWORD
        }

### Response if Fails
            {
                "Status": "UnSuccess"
            }

`The following Api's Will required the header Authorization with the token generated by the signIn Api`

## Get Images

`GET /getImages`

        http://localhost:3001/getImages

### Headers

`Authorization`: JWT_TOKEN_SENDED_TO_EMAIL_URL

### Response if Success
        "Status": "Success",
        "data": {
            "total": 3481,
            "total_pages": 871,
            "results": [Array of Objects]
        }
        {}

`Payload:`
        {
        "page": 1,
        "perPage": 4,
        "orderBy": "latest",
        "query": "tiger"
        }

### Response if Fails
        "Status": "Success",
        "data": {
            "total": 0,
            "total_pages": 0,
            "results": []
        }


## Get User Images

`GET /getUserImages`

        http://localhost:3001/getUserImages

### Headers

`Authorization`: JWT_TOKEN_SENDED_TO_EMAIL_URL

### Response if Success
        "Status": "Success",
        "data": [Contains objects with the user saved image details],
        "error": null
        {}

`Payload:`
        {
        "page": 0,
        "perPage": 5"
        }

### Response if Fails
        "Status": "Success",
        "data": [],
        "error": ERRORS_DETECTED


## Save User Images

`For the payload information select any of the get image api object. A refference to the params: `
`description = alt_description || description`
`type = jpg || png`
`key = id. This value should be unique. Make sure to try another image id when trying multiple saves.`
`name = any you would like to place to the image`
`url = urls array. Can select it all or just do an {} with the following urls keys and values: regular, full, small, thumb`

`POST /saveUserImage`

        http://localhost:3001/saveUserImage

### Headers

`Authorization`: JWT_TOKEN_SENDED_TO_EMAIL_URL

### Response if Success
        "Status": "Success",
        "message": "Image Saved!"

        {}

`Payload:`
        {
        "details": {
            "name": "tiger8",
            "type": "jpg",
            "description": "a large tiger laying on top of a dirt field",
            "key": "c_w9ylBGkdI",
            "url": {
                "full": "",
                "regular": "",
                "small": "",
                "thumb": ""
            }
        }
        }

### Response if Fails
        "Status": "Unsuccess",
        "data": {
            "image": [array of same image found for user],
            "error": null
        },
        "message": "Image already exist for user."


## Update User Images

`For the payload information select the save user image payload and change any parameter.`

`PUT /updateUserImage`

        http://localhost:3001/updateUserImage

### Headers

`Authorization`: JWT_TOKEN_SENDED_TO_EMAIL_URL

### Response if Success
        "Status": "Success",
        "message": "Image updated!"

        {}

`Payload:`
        {
        "details": {
            "name": "tiger8",
            "type": "jpg",
            "description": "a large tiger laying on top of a dirt field",
            "key": "c_w9ylBGkdI",
            "url": {
                "full": "",
                "regular": "",
                "small": "",
                "thumb": ""
            }
        }
        }

### Response if Fails
        "Status": "Unsuccess",
        "data": {},
        "message": {
            "user": "",
            "name": "Invalid image name.",
            "type": "",
            "key": "",
            "description": "",
            "url": ""
            }


## Save S3 Image

`For the payload information select the corresponding param from the data used on save user image api. For the image param you can use any of the urls saved: regular, thumb, full, small `


`POST /saveS3Image`

        http://localhost:3001/saveS3Image

### Headers

`Authorization`: JWT_TOKEN_SENDED_TO_EMAIL_URL

### Response if Success
        "Status": "Success",
        "data": IMAGE_URL,
        "message": {
            "image": "",
            "key": "",
            "type": "",
            "name": ""
        }

        {}

`Payload:`
        {
            "key": "DqVU8c9woUg",
            "name": "tiger3",
            "image": IMAGE_URL,
            "type": "jpg"
        }

### Response if Fails
        {
            "Status": "Unsuccess",
            "data": null,
            "message": {
                "image": "Invalid image",
                "key": "Invalid key",
                "type": "Invalid type",
                "name": "Invalid image key."
            }
        }

## Update S3 Image

`For the payload information select the corresponding param from the data used on update user image api.`


`PUT /updateS3Image`

        http://localhost:3001/updateS3Image

### Headers

`Authorization`: JWT_TOKEN_SENDED_TO_EMAIL_URL

### Response if Success
        "Status": "Success",
        
        {}

`Payload:`
        {
            "key": "DqVU8c9woUg",
            "type": "jpg",
            "name": "tiger5"
        }

### Response if Fails
        {
            "Status": "Unsuccess",
            "data": [],
            "message": "Image not found."
        }


## Download S3 Image

`For the payload information select the corresponding param from the data used on save user image api.`


`PUT /downloadS3Image`

        http://localhost:3001/downloadS3Image

### Headers

`Authorization`: JWT_TOKEN_SENDED_TO_EMAIL_URL

### Response if Success
        "Status": "Success",
        "error": null
        
        {}

`Payload:`
        {
            "key": "DqVU8c9woUg",
            "type": "jpg"
        }

### Response if Fails
        {
                "Status": "Unsuccess",
                "error": {
                        "key": "",
                        "type": "Image type not valid."
                }       
        }


#Experimental API

## Setup Configuration

`This API is still in development for its total integration. You can access this API by switching to branch: feature/persist-config. NOTE: Only Tested in Windows. Make sure to run this API after SignIn API.`


`GET /setupConfig`

        http://localhost:3001/setupConfig

### Headers

`Authorization`: JWT_TOKEN_SENDED_TO_EMAIL_URL

### Response if Success
        "Status": "Success", 
        "message": "Configuration Saved!"
        
        {}

`Payload:`
        {
 
        }

### Response if Fails
        { 
                "Status": "Unsuccess", 
                "error": "Could not set global configurations!"
        }
