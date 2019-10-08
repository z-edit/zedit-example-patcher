let ExamplePatcher = require('./src/ExamplePatcher');

module.exports = ({registerPatcher, info, patcherUrl}) => {
    registerPatcher(new ExamplePatcher({info, patcherUrl}));
};
