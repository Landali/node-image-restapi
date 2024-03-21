
const User = require('../../models/user')
const { userSignIn, userSignUp, userForgotPassword } = require('../../utils/validators/userAuth');
const { hashPassword, comparePasswords } = require('../../utils/encryptions/bcrypt');
const { jwtSignIn, jwtForgotPasswordSignIn, jwtTokenVerify } = require('../../utils/tokens/jwt');
const { sendRecoveryEmail } = require('../../services/mailer');

module.exports = {
    async signIn(req, res) {

        console.log('Signed In!');

        const validCredentials = userSignIn(req.body);

        if (!validCredentials.isValid) return res.status(400).json({ Status: "Unsucess", error: validCredentials.errors });

        const { user, error, userFound } = await User.signUser(req.body);
        if (error) return res.status(404).json({ Status: "Error.", error });
        if (!user) return res.status(404).json({ Status: "User does not exist." });

        const passwordMatch = await comparePasswords(req.body.password, userFound.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid Credentials' });
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

        if (!userValid.isValid) return res.status(400).json({ Status: "Unsucess", error: userValid.errors });


        const { user, error } = await User.findUser(req.body);
        if (error) return res.status(404).json({ Status: "Error.", error });
        if (user) return res.status(404).json({ Status: "User already exist." });

        const newPassword = await hashPassword(req.body.password);

        const {
            user: newUser,
        } = await User.createUser({ ...req.body, password: newPassword });

        if (newUser) {
            return res.status(200).json({
                message: 'Sign Up Successful',
                data: {}
            })
        }
        return res.status(404).json({
            message: 'Sign Up Unsuccessful',
            data: {}
        })

    },
    async forgotPassword(req, res) {
        console.log('Forgot password');
        const userValid = userForgotPassword(req.body);
        if (!userValid.isValid) return res.status(400).json({ Status: "Unsucess", error: userValid.errors });

        const { user, userFound } = await User.signUser(req.body);
        if (!user) {
            return res.status(404).json({ Status: 'Unsuccessful', error: 'No match for user.' });
        }
        const token = jwtForgotPasswordSignIn(userFound._id);

        const url = `${req.protocol}://${req.get('host')}/resetPassword`;

        const sended = await sendRecoveryEmail({ email: userFound.email, token, url });
        return res.status(200).json({ Status: 'Success', token });
    },
    async resetPassword(req, res) {
        console.log('Reset password!');
        const { user, password } = req.body;
        const newPassword = await hashPassword(password);
        const updatedUser = User.updateUserPassword({ user, password: newPassword });
        if (!updatedUser) {
            return res.status(404).json({ Status: 'UnSuccess' });
        }
        return res.status(200).json({ Status: 'Success' });
    }
}