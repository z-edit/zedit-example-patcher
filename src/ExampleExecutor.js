let ExampleArmorPatcher = require('./ExampleArmorPatcher'),
    ExampleReferencePatcher = require('./ExampleReferencePatcher');

let {AddElement, AddElementValue} = xelib;

class ExampleExecutor {
    constructor({patchFile, settings, helpers, locals}) {
        this.patchFile = patchFile;
        this.settings = settings;
        this.helpers = helpers;
        this.locals = locals;
    }

    // Optional function, omit if empty.
    // Perform anything that needs to be done once at the beginning of the
    // patcher's execution here.  This can be used to cache records which don't
    // need to be patched, but need to be referred to later on.  Store values
    // on the locals variable to refer to them later in the patching process.
    initialize() {
        let {logMessage, loadRecords} = this.helpers;
        logMessage(this.settings.exampleSetting);
        // this line shows you how to load records using the loadRecords helper
        // function and store them on locals for the purpose of caching
        this.locals.weapons = loadRecords('WEAP');
    }

    get process() {
        return [
            new ExampleArmorPatcher(this),
            new ExampleReferencePatcher(this)
        ];
    }

    // Optional function, omit if empty. Perform any cleanup here.
    // note that the framework automatically removes unused masters as
    // well as ITPO and ITM records, so you don't need to do that
    finalize() {
        let {logMessage, cacheRecord} = this.helpers;
        logMessage(`Found ${this.locals.weapons.length} cached weapons records.`);
        // this creates a new record at the same form ID each time the patch
        // is rebuilt so it doesn't get lost when the user rebuilds a patch
        // plugin and loads a save
        let weapon = AddElement(this.patchFile, 'WEAP\\WEAP');
        cacheRecord(weapon, 'MEPz_BlankWeapon');
        AddElementValue(weapon, 'FULL', 'Blank Weapon');
    }
}

module.exports = ExampleExecutor;
