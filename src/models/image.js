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

imageSchema.statics = {
    async findUserImages({ user, page, perPage }) {
        try {
            const images = await Image
                .find({ user }, { _id: 0, details: 1 })
                .skip(page)
                .limit(perPage);

            return { images, error: null };
        } catch (error) {
            console.log('Error while finding a user images: ', error);
            return { images: [], error: error.message };
        }
    },
};


const Image = model('image', imageSchema);

module.exports = Image;