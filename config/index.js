module.exports = {
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'email@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'root',
    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',

    PORT: process.env.PORT || 5600,

    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5600'
}
