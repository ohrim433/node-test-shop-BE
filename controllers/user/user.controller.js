const {emailActions, responceStatusCodes} = require('../../constants');
const {ErrorHandler, errors: {NOT_FOUND}} = require('../../errors');
const {checkHashedPasswords, hashPassword} = require('../../helpers');
const {emailService, userService} = require('../../services');

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

            await emailService.sendMail(
                user.email,
                emailActions.USER_REGISTER,
                {userName: user.name}
            );

            res.sendStatus(201);  // The HTTP 201 Created success status response code
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: async (req, res, next) => {
        res.json(req.user);
    },

    deleteUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = req.user;

            await userService.deleteUser({id: userId});

            await emailService.sendMail(
                user.email,
                emailActions.USER_DELETE,
                {userName: user.name});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }

        res.end();
    },

    updateUser: async (req, res, next) => {
        try {
            const {userId} = req.params;
            const user = req.body;

            await userService.updateUser(userId, user);

            await emailService.sendMail(
                req.user.email,
                emailActions.USER_UPDATE,
                {userId, userName: user.name, userAge: user.age});

            // The HTTP 200 OK success status response code indicates that the request has succeeded
            res.sendStatus(200)
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler(
                    NOT_FOUND.message,
                    responceStatusCodes.NOT_FOUND,
                    NOT_FOUND.code
                ));
            }

            await checkHashedPasswords(user.password, password);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
}
