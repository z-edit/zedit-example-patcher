/* global ngapp, xelib */
let modulePath = '../modules/matorsExamplePatcher';

registerPatcher({
    info: info,
    gameModes: [xelib.gmTES5, xelib.gmSSE],
    settings: {
        label: 'Example Patcher',
        templateUrl: `${modulePath}/partials/settings.html`,
        defaultSettings: {
            exampleSetting: 'hello world',
            patchFileName: 'examplePatch.esp'
        }
    },
    requiredFiles: [],
    getFilesToPatch: function(filenames) {
        return filenames;
    },
    execute: {
        initialize: function(patch, helpers, settings, locals) {
            // Perform anything that needs to be done once at the beginning of the
            // patcher's execution here.  This can be used to cache records which don't
            // need to be patched, but need to be referred to later on.  Store values
            // on the locals variable to refer to them later in the patching process.
            helpers.logMessage(settings.exampleSetting);
            locals.weapons = helpers.loadRecords('WEAP');
        },
        process: [{
            load: function(plugin, helpers, settings, locals) {
                // return a falsy value to skip loading/patching any records from a plugin
                // return an object specifying the signature to load, and a filter
                // function which returns true if a record should be patched.
                if (xelib.Name(plugin) === 'Skyrim.esm') return;
                return {
                    signature: 'ARMO',
                    filter: function(record) {
                        return parseFloat(xelib.GetValue(record, 'DNAM')) > 20;
                    }
                }
            },
            patch: function(record, helpers, settings, locals) {
                // change values on the record as required
                // you can also remove the record here, but it is discouraged.
                // (try to use filters instead.)
                helpers.logMessage(`Patching ${xelib.LongName(record)}`);
                xelib.SetValue(record, 'DNAM', '30');
            }
        }],
        finalize: function(patch, helpers, settings, locals) {
            // perform any cleanup here
            // note that the framework automatically removes unused masters as
            // well as ITPO and ITM records, so you don't need to do that
        }
    }
});