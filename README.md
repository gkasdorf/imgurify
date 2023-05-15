# imgurify
Easy screenshot uploading to imgur for macOS. This will work anywhere, but you will need to always manually supply a valid 
path for the image.

If you are on macOS, imgurify will get the latest screenshot provided it was saved to your Desktop and the name of the file
is a standard macOS screenshot name (i.e. `Screenshot 2023-05-14 at 7.12.48 PM`).

## Requirements
You will need to obtain an Imgur client ID from [the API registration page](https://api.imgur.com/oauth2/addclient).

## Installation
```
npm install -g @gkasdorf/imgurify
```

## Usage
### `--set-client-id [client-id]`
Stores the client ID.

### `--upload / -u`
Uploads the most recent screenshot from the desktop.

### `--upload [path] / -u [path]`
Uploads the image at the specified path.

### `--debug`
Display the response from Imgur if you are having issues.

### `--show-settings`
Display the stored client ID.
