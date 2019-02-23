/* global ngapp, xelib, registerPatcher, patcherUrl */

// this patcher doesn't do anything useful, it's just a heavily commented
// example of how to create a UPF patcher.
registerPatcher({
    info: info,
    // array of the game modes your patcher works with
    // see docs://Development/APIs/xelib/Setup for a list of game modes
    gameModes: [xelib.gmSSE, xelib.gmTES5, xelib.gmTES4,  
                xelib.gmFO4, xelib.gmFNV,  xelib.gmFO3],
    settings: {
        // The label is what gets displayed as the settings tab's label
        label: 'Example Patcher',
        // if you set hide to true the settings tab will not be displayed
        //hide: true,
        templateUrl: `${patcherUrl}/partials/settings.html`,
        // controller function for your patcher's settings tab.
        // this is where you put any extra data binding/functions that you
        // need to access through angular on the settings tab.
        controller: function($scope) {
            let patcherSettings = $scope.settings.matorsExamplePatcher;

            // function defined on the scope, gets called when the user
            // clicks the Show Message button via ng-click="showMessage()"
            $scope.showMessage = function() {
                alert(patcherSettings.exampleSetting);
            };
        },
        // default settings for your patcher.  use the patchFileName setting if
        // you want to use a unique patch file for your patcher instead of the
        // default zPatch.esp plugin file.  (using zPatch.esp is recommended)
        defaultSettings: {
            exampleSetting: 'hello world',
            patchFileName: 'examplePatch.esp'
        }
    },
    // optional array of required filenames.  can omit if empty.
    requiredFiles: [],
    getFilesToPatch: function(filenames) {
        // Optional.  You can program strict exclusions here.  These exclusions
        // cannot be overridden by the user.  This function can be removed if you 
        // don't want to hard-exclude any files.
        let gameName = xelib.GetGlobal('GameName');
        return filenames.subtract([`${gameName}.esm`]);
    },
    execute: (patchFile, helpers, settings, locals) => ({
        initialize: function() {
            // Optional function, omit if empty.
            // Perform anything that needs to be done once at the beginning of the
            // patcher's execution here.  This can be used to cache records which don't
            // need to be patched, but need to be referred to later on.  Store values
            // on the locals variable to refer to them later in the patching process.
            helpers.logMessage(settings.exampleSetting);
            // this line shows you how to load records using the loadRecords helper
            // function and store them on locals for the purpose of caching
            locals.weapons = helpers.loadRecords('WEAP');
        },
        // required: array of process blocks. each process block should have both
        // a load and a patch function.
        process: [{
            load: {
                signature: 'ARMO',
                filter: function(record) {
                    // return false to filter out (ignore) a particular record
                    return parseFloat(xelib.GetValue(record, 'DNAM')) > 20;
                }
            },
            patch: function(record) {
                // change values on the record as required
                // you can also remove the record here, but it is discouraged.
                // (try to use filters instead.)
                helpers.logMessage(`Patching ${xelib.LongName(record)}`);
                xelib.SetValue(record, 'DNAM', '30');
            }
        }, {
            // loads all REFRs that place Weapons
            records: filesToPatch => {
                let records = filesToPatch.map(f => {
                    return xelib.GetREFRs(f, 'WEAP');
                });
                return Array.prototype.concat.apply([], records);
            },
            // patches REFRs that place weapons to be initially disabled
            patch: function(record) {
                xelib.SetFlag(record, 'Record Header\\Record Flags', 'Initially Disabled', true);
            }
        }],
        finalize: function() {
            // Optional function, omit if empty. Perform any cleanup here.
            // note that the framework automatically removes unused masters as
            // well as ITPO and ITM records, so you don't need to do that
            helpers.logMessage(`Found ${locals.weapons.length} cached weapons records.`);
            // this creates a new record at the same form ID each time the patch
            // is rebuilt so it doesn't get lost when the user rebuilds a patch
            // plugin and loads a save
            let weapon  = xelib.AddElement(patchFile, 'WEAP\\WEAP');
            helpers.cacheRecord(weapon, 'MEPz_BlankWeapon');
            xelib.AddElementValue(weapon, 'FULL', 'Blank Weapon');
        }
    })
});