const s3 = require('./amazonS3')

const uploadFile = (image, userID) => {
    // Setting up S3 upload parameters
    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: userID + ".png", // File name you want to save as in S3
        Body: image.data
    };

    // Uploading files to the bucket
    s3.upload(uploadParams, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

module.exports = uploadFile;
