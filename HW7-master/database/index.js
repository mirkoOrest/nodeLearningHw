const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(
            process.env.DATA_BASE_NAME,
            process.env.DATA_BASE_USERNAME,
            process.env.DATA_BASE_PASSWORD,
            {
                host: process.env.DATA_BASE_HOST_NAME,
                dialect: process.env.DATA_BASE_DIALECT
            });

        let models = {};

        function getModels() {
            fs.readdir(path.join(
                process.cwd(),
                process.env.DATA_BASE_DIRECTORY,
                process.env.DATA_BASE_MODELS
            ), (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(
                        path.join(
                            process.cwd(),
                            process.env.DATA_BASE_DIRECTORY,
                            process.env.DATA_BASE_MODELS,
                            modelName
                        ));
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
