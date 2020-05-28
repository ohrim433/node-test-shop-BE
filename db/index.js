const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const {dbName, dbUsername, dbUserPass, dbHost, dbDialect} = require('../constants');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(dbName, dbUsername, dbUserPass, {
            host: dbHost,
            dialect: dbDialect,
        });

        let models = {};

        function getModels() {
            fs.readdir(path.join(process.cwd(), 'db', 'models'), (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(path.join(process.cwd(), 'db', 'models', modelName));
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
