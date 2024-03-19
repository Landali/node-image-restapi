const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

const passwordSchemaRequirements = {
    min: { value: 8, message: 'minimum 8 chars please' },
    max: { value: 11, message: 'maximum 11 chars please' },
    digits: { value: 2, message: 'minimum 2 digits please' },
    uppercase: { value: 1, message: 'maximum 1 chars in CAPS please' },
    blackListedPasswords: { value: ['Password'], message: 'string not permitted.' }
}

const passwordSchema = () => {
    const { min, max, digits, uppercase, blackListedPasswords } = passwordSchemaRequirements;
    const schema = new passwordValidator();
    schema
        .is().min(min.value, min.message)
        .is().max(max.value, max.message)
        .has().uppercase(uppercase.value, uppercase.message)
        .has().lowercase()
        .has().digits(digits.value, digits.message)
        .has().not().spaces()
        .is().not().oneOf(blackListedPasswords.value, blackListedPasswords.message);

    return schema;
}

const validatePassword = (password) => {
    const schema = passwordSchema();
    const isValid = schema.validate(password, { details: true });
    console.log('Is password valid?', isValid);
    return { isValid: isValid.length === 0, error: isValid }
}

const validateEmail = (email) => {
    const isValid = emailValidator.validate(email);
    console.log('Email valid?', isValid);

    return { isValid, error: !isValid ? ['Invalid email format.'] : [] };
}

const validateUsername = (username) => {

    if (!username || username === '' || username === ' ') return false;

    const regex = new RegExp('^[a-zA-Z0-9]*$');
    const isValid = username.match(regex);
    return {
        isValid: !isValid ? false : true,
        error: !isValid ? ['User format incorrect, make sure to only use numbers and chars'] : []
    }
}

const userSignUp = ({ username, password, email }) => {

    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    const usernameValid = validateUsername(username);

    const validUserSignUp = {
        isValid: emailValid.isValid && passwordValid.isValid && usernameValid.isValid,
        errors: {
            email: emailValid.error,
            password: passwordValid.error,
            username: usernameValid.error
        }
    }

    return validUserSignUp
}

const userSignIn = ({ user, password, isEmail }) => {

    const userValid = isEmail ? validateEmail(user) : validateUsername(user);
    const passwordValid = validatePassword(password);

    const validUserSignIn = {
        isValid: userValid.isValid && passwordValid.isValid,
        errors: {
            credentials: userValid.isValid && passwordValid.isValid
                ? [] : ['Invalid credentials!']
        }
    };

    return validUserSignIn
}


module.exports = { userSignUp, userSignIn, passwordSchema, validateUsername, validateEmail }