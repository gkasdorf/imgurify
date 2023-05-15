const fs = require('fs');
const os = require("os");
const {uploadImage} = require("./imgur/imgurApi");
const {getSettings} = require("./settings");

const desktopDir = `${os.homedir()}/Desktop`;

const getFiles = () => {
    const list = fs.readdirSync(desktopDir);

    return list.sort((a, b) => {
        return fs.statSync(`${desktopDir}/${b}`).mtime.getTime() - fs.statSync(`${desktopDir}/${a}`).mtime.getTime();
    });
};

const upload = (filePath = null) => {
    const settings  = getSettings();

    if(!settings || settings["clientId"] === "" || !settings["clientId"]) {
        console.log("No client id set. Run with --set-client-id [client-id] to set the client id.");
        return;
    }

    let file;
    let fileName;

    if(!filePath) {
        const files = getFiles();

        const regex = /^Screenshot\s\d{4}-\d{2}-\d{2}\sat\s\d{1,2}\.\d{2}\.\d{2}\s(AM|PM)\.png$/;
        const screenshotFiles = files.filter(file => regex.test(file));

        fileName = screenshotFiles[0];
        file = fs.readFileSync(`${desktopDir}/${fileName}`);
    } else {
        const split = filePath.split("/");

        fileName = split[split.length - 1];
        file = fs.readFileSync(filePath);
    }

    uploadImage(file, fileName).then(r => {
        if(!r.data.success) {
            console.log("Error uploading image to imgur.");

            if(args["debug"]) {
                console.log(r);
                return;
            }

            console.log("Run with --debug to see the error message.");

            return;
        }

        console.log("Image uploaded to imgur.");
        console.log(`Link: ${r.data.data.link}`);
    });
}

module.exports = {
    upload
};
