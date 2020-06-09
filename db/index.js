const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const {dbNames: {DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT}, dbFolders: {DB_ROOT_FOLDER, MODELS_ROOT_FOLDER}} = require('../constants');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
            host: DB_HOST,
            dialect: DB_DIALECT,
        });

        let models = {};

        function getModels() {
            fs.readdir(path.join(process.cwd(), DB_ROOT_FOLDER, MODELS_ROOT_FOLDER), (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(path.join(process.cwd(), DB_ROOT_FOLDER, MODELS_ROOT_FOLDER, modelName));
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
