const {userService} = require('../../services');
const {hashPassword, checkHashedPasswords} = require('../../helpers');
const {ErrorHandler} = require('../../errors');

module.exports = {

    getAllUsers: async (req, res) => {
        let usersList = await userService.getUsers();

        res.json(usersList);
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body;

            user.password = await hashPassword(user.password);

            await userService.createUser(user);

            res.sendStatus(201);  // The HTTP 201 Created success status response code
        } catch (e) {
            next(e.message);
        }
    },

    getSingleUser: async (req, res, next) => {
        res.json(req.user);
    },

    deleteUser: async (req, res, next) => {
        const {userId} = req.params;
        try {
            await userService.deleteUser({id: userId});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }

        res.end();
    },

    updateUser: async (req, res, next) => {
        const {userId} = req.params;
        const user = req.body;
        try {
            const [isSuccess] = await userService.updateUser(userId, user);

            // The HTTP 200 OK success status response code indicates that the request has succeeded
            isSuccess ? res.sendStatus(200) : next(new ErrorHandler('New data is not valid', 406, 4061));
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await userService.getSingleUser({email});

            if (!user) {
                return next(new ErrorHandler('Data is incorrect', 404, 4041));
            }

            await checkHashedPasswords(user.password, password);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
}
