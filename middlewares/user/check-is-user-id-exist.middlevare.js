const {userService} = require('../../services');
const {ErrorHandler} = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const {userId} = req.params;

        if (isNaN(userId) || +userId < 0) return next(new ErrorHandler('Incorrect id', 400, 4001));

        const user = await userService.getUserByParams({id: userId});

        if (!user) return next(new ErrorHandler('Not found', 404, 4041));

        req.user = user;

        next();
    } catch (e) {
        next(e.message);
    }

}
