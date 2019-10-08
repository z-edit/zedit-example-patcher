let ExamplePatcherSettings = require('./ExamplePatcherSettings'),
    ExampleExecutor = require('./ExampleExecutor');

let {gmSSE, gmTES5, GetGlobal} = xelib;

// this patcher doesn't do anything useful, it's just a heavily commented
// example of how to create a UPF patcher.
class ExamplePatcher {
    constructor({info, patcherUrl}) {
        this.info = info;
        this.settings = new ExamplePatcherSettings(patcherUrl);
    }

    // array of the game modes your patcher works with
    // see docs://Development/APIs/xelib/Setup for a list of game modes
    get gameModes() {
        return [gmSSE, gmTES5];
    }

    // optional array of required filenames.  can omit if empty.
    get requiredFiles() {
        return [];
    }

    // Optional.  You can program strict exclusions here.  These exclusions
    // cannot be overridden by the user.  This function can be removed if you
    // don't want to hard-exclude any files.
    getFilesToPatch(filenames) {
        let gameName = GetGlobal('GameName');
        return filenames.subtract([`${gameName}.esm`]);
    }

    execute(patchFile, settings, helpers, locals) {
        return new ExampleExecutor({patchFile, settings, helpers, locals});
    }
}

module.exports = ExamplePatcher;
