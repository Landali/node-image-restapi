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
        "user": USER_NAME,
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
