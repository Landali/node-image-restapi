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
)

const userModel = model('user', userSchema);

module.exports = userModel