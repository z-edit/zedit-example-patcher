class ExamplePatcherSettings {
    constructor(patcherUrl) {
        this.patcherUrl = patcherUrl;
    }

    // The label is what gets displayed as the settings tab's label
    get label() {
        return 'Example Patcher';
    }

    // if you set hide to true the settings tab will not be displayed
    get hide() {
        return false;
    }

    get templateUrl() {
        return `${this.patcherUrl}/partials/settings.html`
    }

    // controller function for your patcher's settings tab.
    // this is where you put any extra data binding/functions that you
    // need to access through angular on the settings tab.
    controller($scope) {
        let patcherSettings = $scope.settings.matorsExamplePatcher;

        // function defined on the scope, gets called when the user
        // clicks the Show Message button via ng-click="showMessage()"
        $scope.showMessage = function() {
            alert(patcherSettings.exampleSetting);
        };
    }

    // default settings for your patcher.  use the patchFileName setting if
    // you want to use a unique patch file for your patcher instead of the
    // default zPatch.esp plugin file.  (using zPatch.esp is recommended)
    get defaultSettings() {
        return {
            exampleSetting: 'hello world',
            patchFileName: 'examplePatch.esp'
        };
    }
}

module.exports = ExamplePatcherSettings;
