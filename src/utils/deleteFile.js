const cloudinary = require("../config/cloud");

const extractPublicId = (url) => {
  const parts = url.split("/");
  const lastPart = parts.pop();
  const publicIdWithVersion = lastPart.split(".")[0].split("?")[0];
  return publicIdWithVersion;
};

const deleteFile = (url) => {
  let publicId = [];
  if (url instanceof Array) {
    url.map((u) => {
      publicId.push(extractPublicId(u));
    });
    cloudinary.api.delete_resources(publicId, function (error) {
      if (error) {
        throw new Error(error);
      }
    });
  } else {
    publicId = extractPublicId(url);
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error("Error deleting file:", error);
      } else {
        console.log("Error:", result);
      }
    });
  }
  return 1;
};

module.exports = deleteFile;
