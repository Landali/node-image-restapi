const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development' || NODE_ENV === 'test') {
  require('dotenv').config();
}

let settings = {};
try {
  settings = {
    PORT: process.env.PORT || 3001,
    DB_URI: process.env.DB_URI || 'mongodb://',
    DB: process.env.DB || 'mongodb',
    PASSWORD_SALT: process.env.PASSWORD_SALT || 10,
    JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET || 'my-token-password',
    PASSWORD_RESET_JWT_TOKEN_SECRET: process.env.PASSWORD_RESET_JWT_TOKEN_SECRET || 'my-token-password2',
    TOKEN_DURATION: process.env.TOKEN_DURATION || '2h',
    PASSWORD_RESET_TOKEN_DURATION: process.env.PASSWORD_RESET_TOKEN_DURATION || '10m',
    MAILER_SERVICE: process.env.MAILER_SERVICE || 'hotmail',
    EMAIL: process.env.EMAIL || '',
    PASSWORD: process.env.PASSWORD || '',
    UNSPLASH_API_URL: process.env.UNSPLASH_API_URL || 'https://api.unsplash.com',
    UNSPLASH_API_ACCESS_KEY: process.env.UNSPLASH_API_ACCESS_KEY || '',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || '',
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || ''
  };
} catch (error) {
  console.error('Retrieving Settings Error: ', { error });
  settings.ERROR = `Settings Error: ${error}`;
}

module.exports = settings;
