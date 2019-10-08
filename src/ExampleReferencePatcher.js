let {GetREFRs, SetRecordFlag} = xelib;

class ExampleReferencePatcher {
    constructor({patchFile, settings, helpers, locals}) {
        this.patchFile = patchFile;
        this.settings = settings;
        this.helpers = helpers;
        this.locals = locals;
    }

    // loads all REFRs that place Weapons
    records(filesToPatch) {
        let records = filesToPatch.map(f => GetREFRs(f, 'WEAP'));
        return Array.prototype.concat.apply([], records);
    }

    // patches REFRs that place weapons to be initially disabled
    patch(record) {
        SetRecordFlag(record, 'Initially Disabled', true);
    }
}

module.exports = ExampleReferencePatcher;
