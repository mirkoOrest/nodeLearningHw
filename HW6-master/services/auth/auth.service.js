const db = require('../../database').getInstance();

const {modelNameEnum: {TOKEN}} = require('../../constants');


module.exports = {


    getTokenByParams: (params) => {
        const TokenModel = db.getModel(TOKEN);
        return TokenModel.findOne({
            where: params
        });


    },


    deleteByParams: (params) => {
        const TokenModel = db.getModel(TOKEN);
        return TokenModel.destroy({
            where: {
                params
            }
        });

    },


    createTokenPair: (tokens) => {
        const TokenModel = db.getModel(TOKEN);
        return TokenModel.create(tokens);
    }


};
