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
    TOKEN_DURATION: process.env.TOKEN_DURATION || '2h'
  };
} catch (error) {
  console.error('Retrieving Settings Error: ', { error });
  settings.ERROR = `Settings Error: ${error}`;
}

module.exports = settings;
