# zedit-example-patcher
An example patcher using zEdit's Unified Patching Framework.

## setup
This is a great patcher to start with when creating your first zEdit UPF Patcher.  Follow the steps below to get started:

### Step 1: Clone this repository
You can clone the repository by downloading it directly from GitHub like so:

![](http://puu.sh/A4vtu.png)

Alternatively, you can clone the repository using a Git client.  I recommend this approach because it will prepare you to use version control to manage and share your code as you develop and update it.  There are numerous Git clients you can choose from:

- [GitKraken](https://www.gitkraken.com/) - A simple but good-looking multi-platform option.
- [SourceTree](https://www.sourcetreeapp.com/) - Slightly more complex than GitKraken, created by Atlassian.
- [GitHub Desktop](https://desktop.github.com/) - GitHub's official client.

### Step 2: Install npm and NodeJS
[Download NodeJS](https://nodejs.org/en/download/) and install it.  This will allow you to use `npm` from the command line to install NodeJS packages.  We use `npm` to set up a [gulp](https://gulpjs.com/) build system so we can use multiple JavaScript source files in development and create release archives with a single command.

You can open a command prompt window and type `node -v` and `npm -v` to verify NodeJS and npm installed correctly.

### Step 3: `npm install`
Open a command prompt in the folder where you cloned the repository.  On windows, you can hold shift and right-click in the folder to get an "Open command prompt here" context menu option.

![](http://puu.sh/A4w0m.png)

Type `npm install` to install packages.  If everything installs successfully you should see a message saying `up to date`.

### Step 4: Build and Release
You can build and release the patcher by running `npm run build` and `npm run release`.

`npm run build` creates the `dist` folder.  In the `dist` folder will be a built `index.js` JavaScript file (concatenating javascript files you required using `//= require`), the entire contents of your `partials` folder, and your `module.json` file.

`npm run release` creates a ZIP archive in the format `{patcherId}-v{version}.zip`, e.g. `matorsExamplePatcher-v1.2.1.zip`.  This archive is a release archive that you can upload and share with people.  It's set up so users can install it through zEdit's Manage Extensions window.

### Step 5: Installing the module
You can install the patcher module from the Manage Extensions modal.  You can click the icon of three cubes in zEdit's title bar to open the manage extensions modal:

![](http://puu.sh/A4wzp.png)

From the manage extensions modal, click "Install Module", then browse to and select your release archive.  You can also install modules via their `module.json` file (if you install a module this way, make sure you select the `module.json` file in the `dist` folder).

In addition to installing modules through the manage extensions modal, you can also install modules by extracting the release archive directly into zEdit's `modules` folder, or by copying the `dist` folder into zEdit's modules folder and renaming it to the `id` of your module (as specified in `module.json`).  All zEdit modules must use unique IDs.

![](http://puu.sh/A4wNu.png)

### Step 6: Running the patcher
Click the puzzle piece icon in the title bar or right-click in the Tree View and click "Manage Patchers" to open the Manage Patchers Window.

![](http://puu.sh/A4wS6.png) ![](http://puu.sh/A4wUH.png)

From the manage patchers window click the "Build" button by "examplePatch.esp".

![](http://puu.sh/A4wXG.png)

The patch should be built in a few seconds, resulting in a new file being displayed in the tree view:

![](http://puu.sh/A4x0u.png)

The file should contain overrides for ARMO records with armor rating set to 30:

![](http://puu.sh/A4x1B.png)

As well as a single new blank weapon record:

![](http://puu.sh/A4x4m.png)
