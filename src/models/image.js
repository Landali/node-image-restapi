const { Schema, model } = require('mongoose');

const imageSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        details: {
            name: {
                type: String,
                default: '',
                required: true,
            },
            type: {
                type: String,
                enum: ['jpg', 'png'],
                default: 'jpg',
                required: true,
            },
            description: {
                type: String,
                default: '',
                required: true,
            },
            key: {
                type: String,
                default: '',
                required: true,
            },
            url: {
                full: {
                    type: String,
                    default: '',
                    required: true,
                },
                regular: {
                    type: String,
                    default: '',
                    required: true,
                },
                small: {
                    type: String,
                    default: '',
                    required: true,
                },
                thumb: {
                    type: String,
                    default: '',
                    required: true,
                }
            }
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Image = model('image', imageSchema);

module.exports = Image;