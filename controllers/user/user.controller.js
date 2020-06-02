const {userService} = require('../../services');

module.exports = {

    getAllUsers: async (req, res) => {
        let usersList = await userService.getUsers();

        res.json(usersList);
    },

    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);

            res.sendStatus(201);  // The HTTP 201 Created success status response code
        } catch (e) {
            res.json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        const {userId} = req.params;
        try {
            const user = await userService.getSingleUser(userId);

            res.json(user);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        const {userId} = req.params;
        try {
            const isSuccess = await userService.deleteUser(userId);

            // The HTTP 204 No Content success status response code
            isSuccess ? res.sendStatus(204) : res.json({deleted: true});
        } catch (e) {
            res.json(e.message);
        }

        res.end();
    },

    updateUser: async (req, res) => {
        const {userId} = req.params;
        const user = req.body;
        try {
            const [isSuccess] = await userService.updateUser(userId, user);

            // The HTTP 200 OK success status response code indicates that the request has succeeded
            isSuccess ? res.sendStatus(200) : res.json({updated: false});
        } catch (e) {
            res.json(e.message);
        }
    }
}
