const AWS = require('aws-sdk');
const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_BUCKET_NAME } = require('../../settings');

const s3connect = async () => {
    const s3 = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    })
    return s3
}

const retrieveS3Objects = async (s3) => {
    const response = await s3.listObjectsV2({
        Bucket: AWS_BUCKET_NAME
    }).promise();
    return response;
}

const awsS3 = async () => {
    try {
        const s3 = await s3connect();
        const response = await retrieveS3Objects(s3);
        console.log('response: ', response.Contents)
        return true;
    } catch (error) {
        console.error('Error retrieving s3 objects: ', error.message);
    }
}

const saveImageS3 = async (name, image, metadata) => {
    try {
        const s3 = await s3connect();
        const saved = await s3.putObject({
            Bucket: AWS_BUCKET_NAME,
            Key: name,
            Body: image,
            Metadata: metadata
        }).promise();
     
        return true;
    } catch (error) {
        console.error('Error to save image in s3: ', error.message);
        return false;
    }
}

const getImageS3 = async (name) => {
    try {
        const s3 = await s3connect();

        const image = await s3.getObject({
            Key: name,
            Bucket: AWS_BUCKET_NAME,
        }).promise();
       
        return { image: image.Body.toString(), metadata: image.Metadata, hasImage: true };

    } catch (error) {
        console.error('Error to retrieve image from bucket: ', { status: error.code, message: error.message });
        return { image: '', metadata: {}, hasImage: false };
    }
}


module.exports = {
    awsS3,
    saveImageS3,
    getImageS3,
}