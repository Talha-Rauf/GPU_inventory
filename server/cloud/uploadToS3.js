const s3 = require('./amazonS3')
const fs = require('fs');

const uploadFile = (file, userID) => {
    // Read content from the file
    const fileContent = fs.readFileSync(file.name);

    // Setting up S3 upload parameters
    const params = {
        Bucket: 'user-management-js',
        Key: userID + '.png', // File name you want to save as in S3
        Body: file
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

module.exports = uploadFile;