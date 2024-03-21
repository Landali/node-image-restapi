# node-image-restapi

## Requirements

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

