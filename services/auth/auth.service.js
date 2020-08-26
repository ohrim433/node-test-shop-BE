const db = require('../../db').getInstance();

const {modelNames: {TOKEN}} = require('../../constants');

class ProductService {

    async createTokenPair(tokens) {
        const TokenModel = await db.getModel(TOKEN);
        TokenModel.create(tokens);
    }

    async getTokensByParams(params) {
        const TokenModel = await db.getModel(TOKEN);
        return TokenModel.findOne({where: params});
    }

    async deleteTokensByParams(params) {
        const TokenModel = await db.getModel(TOKEN);
        return TokenModel.destroy({where: params});
    }
}

module.exports = new ProductService;
