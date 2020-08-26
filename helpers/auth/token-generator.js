const jwt = require('jsonwebtoken');

const {
    tokenWords: {JWT_SECRET, JWT_REFRESH_SECRET},
    tokenExpires: {ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES}
} = require('../../constants');

module.exports = () => {
    const access_token = jwt.sign({}, JWT_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES});
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES});

    return {
        access_token,
        refresh_token
    }
};
