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
                console.warn(`User found: ${userFound}`);
                return { user: true, error: null };
            }
            return { user: false, error: null };
        } catch (error) {
            console.log('Error while finding a user: ', error);
            return { user: true, error: error.message };
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
    }
};

const User = model('user', userSchema);

module.exports = User;