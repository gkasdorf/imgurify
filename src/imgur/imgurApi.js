const axios = require("axios");
const {getSettings} = require("../settings");
const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json"
};

const uploadImage = async (file, fileName) => {
    const settings = getSettings();

    headers["Authorization"] = `Client-ID ${settings["clientId"]}`;

    const formData = new FormData();
    const blobData = new Blob([file], {type: "image/png", filename: fileName});

    formData.append("image", blobData);

    return await axios.post(
        "https://api.imgur.com/3/image",
        blobData,
        {
            headers
        });
};

module.exports = {
    uploadImage
};
