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
                .find({ user }, { _id: 1, details: 1, user: 1 })
                .skip(page)
                .limit(perPage);

            return { images, error: null };
        } catch (error) {
            console.error('Error while finding a user images: ', error);
            return { images: [], error: error.message };
        }
    },
    async saveUserImage({ user, details }) {
        try {
            const newImage = Image.create({ user, details });
            if (newImage) {
                return { image: newImage, error: null };
            }
            return { image: {}, error: 'Image was not saved!' };
        } catch (error) {
            console.error('Error saving user image: ', error.message);
            return { image: {}, error: error.message };
        }

    },
    async findUserImageByKey({ user, key }) {
        try {
            const image = await Image
                .find({ user, 'details.key': key }, { _id: 1, details: 0, user: 0 });
            return { image: !image ? [] : image, error: null };
        } catch (error) {
            console.error('Error while finding a user image: ', error);
            return { images: [], error: error.message };
        }
    },
    async updateUserImage({ user, details }) {
        try {
            console.log('Updating user image');
            const imageUpdated = await Image.findOneAndUpdate({ user }, {
                details
            }, { upsert: false, new: true })

            if (!imageUpdated) {
                console.warn(`Image for user wasn't updated.`);
                return { image: {}, error: 'Image was not updated!' };
            }
            return { image: imageUpdated, error: null };
        } catch (error) {
            console.error('Error updating user image: ', error.message);
            return { image: {}, error: error.message };
        }
    },
};


const Image = model('image', imageSchema);

module.exports = Image;