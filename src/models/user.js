const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
        },
        password: {
            type: String
        },
        email: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.statics = {
    async findUser({ username, email }) {
        try {
            const userFound = await User.findOne({
                $or: [{
                    email: email
                }, {
                    username: username
                }]
            });

            if (userFound) {
                console.warn(`User found: ${userFound._id}`);
                return { user: true, error: null, userFound };
            }
            return { user: false, error: null, userFound };
        } catch (error) {
            console.log('Error while finding a user: ', error);
            return { user: true, error: error.message, userFound: {} };
        }

    },
    async createUser({ username, email, password }) {
        try {
            const newUser = await User.create({ username, email, password })
            if (newUser) {
                return { user: true, error: null };
            }
            return { user: false, error: null };
        } catch (error) {
            console.error('Error to create user: ', error);
            return { user: false, error: error.message };
        }
    },
    async updateUserPassword({ user, password }) {
        console.log(`Updating user:${user}`);
        const userUpdated = await User.findOneAndUpdate({ username: user }, {
            password: password
        }, { upsert: false, new: true })

        if (!userUpdated) {
            console.log(`User: ${user} wasn't updated.`);
            return false;
        }
        return true;
    },
};

const User = model('user', userSchema);

module.exports = User;