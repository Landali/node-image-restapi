
const User = require('../../models/user')
const { userSignIn, userSignUp } = require('../../utils/validators/userAuth');
const { hashPassword, comparePasswords } = require('../../utils/encryptions/bcrypt');



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

        return res.status(200).json({ Status: 'Success' });

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
    }
}