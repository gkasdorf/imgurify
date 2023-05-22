#! /usr/bin/env node

const {upload} = require("./src/upload");
const {saveSettings, showSettings} = require("./src/settings");
const args = require("minimist")(process.argv.slice(2));

global.args = args;

if(args["set-client-id"] || args[""]) {
    saveSettings();
}

if(args["help"] || args["h"] || Object.keys(args).length === 1) {
    console.log("Usage: imgurify [options]");
    console.log("");
    console.log("Options:");
    console.log("  --help/-h                        Display this message.");
    console.log("  --set-client-id [client-id]      Set the client id for imgur.");
    console.log("  --show-settings                  Show the saved settings.");
    console.log("  --upload/-u                      Upload the latest screenshot to imgur.");
    console.log("  --upload/-u [path]               Upload the image at the specified path to imgur.");
    console.log("  --copy                           Copy the link to the clipboard after uploading.");
    console.log("  --debug                          Show debug information.");
} else if((args["upload"] && args["upload"] === true) || (args["u"] && args["u"] === true)) {
    upload();
} else if(args["upload"] || args["u"]) {
    upload(args["upload"] ?? args["u"]);
} else if(args["show-settings"]) {
    showSettings();
}