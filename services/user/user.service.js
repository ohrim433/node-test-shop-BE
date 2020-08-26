const db = require('../../db').getInstance();

const {modelNames: {USER}} = require('../../constants');

class UserService {

    async getUsers() {
        const UserModel = await db.getModel(USER);
        return UserModel.findAll({});
    }

    async createUser(user) {
        const UserModel = await db.getModel(USER);
        return UserModel.create(user);
    }

    async getUserByParams(params) {
        const UserModel = await db.getModel(USER);
        return UserModel.findOne({where: params});
    }

    async getUserById(id) {
        const UserModel = await db.getModel(USER);
        return UserModel.findByPk(id);
    }

    async deleteUser(params) {
        const UserModel = await db.getModel(USER);
        return UserModel.destroy({where: params});
    }

    async updateUser(id, newUserFields) {
        const UserModel = await db.getModel(USER);
        return UserModel.update(newUserFields, {where: {id}});
    }
}

module.exports = new UserService;
