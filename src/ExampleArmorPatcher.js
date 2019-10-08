let {GetValue, LongName, SetValue} = xelib;

class ExampleArmorPatcher {
    constructor({patchFile, settings, helpers, locals}) {
        this.patchFile = patchFile;
        this.settings = settings;
        this.helpers = helpers;
        this.locals = locals;
    }

    get load() {
        return {
            signature: 'ARMO',
            filter: record => {
                // return false to filter out (ignore) a particular record
                return parseFloat(GetValue(record, 'DNAM')) > 20;
            }
        }
    }

    patch(record) {
        let {logMessage} = this.helpers;
        // change values on the record as required
        // you can also remove the record here, but it is discouraged.
        // (try to use filters instead.)
        logMessage(`Patching ${LongName(record)}`);
        SetValue(record, 'DNAM', '30');
    }
}

module.exports = ExampleArmorPatcher;
