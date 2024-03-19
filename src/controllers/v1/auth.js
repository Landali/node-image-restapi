const { userSignIn, userSignUp } = require('../../utils/validators/userAuth');

module.exports = {
    async signIn(req, res) {

        console.log('Signed In!');

        const validCredentials = userSignIn(req.body);

        if (!validCredentials.isValid) return res.status(401).json({ Status: "Unsucess", error: validCredentials.errors });

        return res.status(200).json({ Status: 'Success' });

    },
    async signUp(req, res) {
        console.log('Signed Up!');

        const userValid = userSignUp(req.body);

        if (!userValid.isValid) return res.status(401).json({ Status: "Unsucess", error: userValid.errors });

        return res.status(200).json({ Status: "Success" });
    }
}