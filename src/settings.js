const {homedir} = require("os");
const {writeFileSync, readFileSync} = require("fs");

const saveSettings = () => {
    const settings = {
        clientId: args["set-client-id"] ?? "",
    }

    writeFileSync(`${homedir()}/.imgurify`, JSON.stringify(settings));
};

const getSettings = () => {
    try {
        return JSON.parse(readFileSync(`${homedir()}/.imgurify`, "utf8"));
    } catch(e) {
    }
}

const showSettings = () => {
    const settings = getSettings();

    if(!settings) {
        console.log("No settings saved.");
        return;
    }

    console.log("Settings:");
    console.log(`  Client Id: ${settings["clientId"]}`);
}

module.exports = {
    saveSettings,
    getSettings,
    showSettings
}