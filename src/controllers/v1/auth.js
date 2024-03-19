
const User = require('../../models/user')
const { userSignIn, userSignUp, userForgotPassword } = require('../../utils/validators/userAuth');
const { hashPassword, comparePasswords } = require('../../utils/encryptions/bcrypt');
const { jwtSignIn, jwtForgotPasswordSignIn } = require('../../utils/tokens/jwt');
const { sendRecoveryEmail } = require('../../services/mailer');

module.exports = {
    async signIn(req, res) {

        console.log('Signed In!');

        const validCredentials = userSignIn(req.body);

        if (!validCredentials.isValid) return res.status(401).json({ Status: "Unsucess", error: validCredentials.errors });

        const { user, error, userFound } = await User.findUser(req.body);
        if (error) return res.status(404).json({ Status: "Error.", error });
        if (!user) return res.status(401).json({ Status: "User does not exist." });

        const passwordMatch = await comparePasswords(req.body.password, userFound.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        const token = jwtSignIn({ id: userFound._id });
        if (!token) {
            return res.status(401).json({ Status: 'No Auth', token: null });
        }
        return res.status(200).json({ Status: 'Success', token });
    },
    async signUp(req, res) {
        console.log('Signed Up!');

        const userValid = userSignUp(req.body);

        if (!userValid.isValid) return res.status(401).json({ Status: "Unsucess", error: userValid.errors });


        const { user, error } = await User.findUser(req.body);
        if (error) return res.status(404).json({ Status: "Error.", error });
        if (user) return res.status(401).json({ Status: "User already exist." });


        console.log('User exist? ', user);


        const newPassword = await hashPassword(req.body.password);
        console.log('Hashed password: ', req.body.password, newPassword);


        const {
            user: newUser,
        } = await User.createUser({ ...req.body, password: newPassword });

        if (newUser) {
            return res.status(200).json({
                message: 'Sign Up Successful',
                code: 200,
                data: {}
            })
        }

        return res.status(401).json({
            message: 'Sign Up Successful',
            code: 401,
            data: {}
        })
    },
    async forgotPassword(req, res) {
        console.log('Forgot password');
        const userValid = userForgotPassword(req.body);
        if (!userValid.isValid) return res.status(401).json({ Status: "Unsucess", error: userValid.errors });

        const { user, userFound } = await User.findUser(req.body);
        if (!user) {
            console.log('User not found')
            return res.status(401).json({ Status: 'Unsuccessful', error: 'No match for user.' });
        }

        const token = jwtForgotPasswordSignIn(userFound._id);

        const url = `${req.protocol}://${req.get('host')}/resetPassword`;

        const sended = await sendRecoveryEmail({ email: 'allanpaz93@hotmail.com', token, url });
        console.log('Email sended', sended);
        return res.status(200).json({ Status: 'Success', token });
    }
}