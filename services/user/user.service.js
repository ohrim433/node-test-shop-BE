const db = require('../../db').getInstance();

const {modelNames: {USER}} = require('../../constants');

class UserService {

    getUsers() {
        const UserModel = db.getModel(USER);
        return UserModel.findAll({});
    }

    async createUser(user) {
        const UserModel = await db.getModel(USER);
        UserModel.create(user);
    }

    async getSingleUser(id) {
        const UserModel = await db.getModel(USER);
        return UserModel.findByPk(id);
    }

    async deleteUser(id) {
        const UserModel = await db.getModel(USER);
        return UserModel.destroy({where: {id}});
    }

    async updateUser(id, newUser) {
        const UserModel = await db.getModel(USER);
        return UserModel.update(newUser, {where: {id}});
    }
}

module.exports = new UserService;
