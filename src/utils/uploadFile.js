const cloud = require("../config/cloud");
const path = require("path");

const uploadFile = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadResult = cloud.uploader.upload_stream(
      {
        public_id: path.parse(file.originalname).name,
      },
      async (error, result) => {
        if (error) {
          return 1;
        }

        const optimizedUrl = cloud.url(result.public_id, {
          fetch_format: "auto",
          quality: "auto",
        });

        if (optimizedUrl) {
          resolve(optimizedUrl);
        }
      }
    );
    uploadResult.end(file.buffer);
  });
};

module.exports = uploadFile;
