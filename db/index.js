const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const {dbNames: {DATABASE, USERNAME, PASSWORD, HOST, DIALECT}, dbFolders: {DBROOTFOLDER, MODELSROOTFOLDER}} = require('../constants');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(DATABASE, USERNAME, PASSWORD, {
            host: HOST,
            dialect: DIALECT,
        });

        let models = {};

        function getModels() {
            fs.readdir(path.join(process.cwd(), DBROOTFOLDER, MODELSROOTFOLDER), (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(path.join(process.cwd(), DBROOTFOLDER, MODELSROOTFOLDER, modelName));
                })
            })
        }

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    }
})();
