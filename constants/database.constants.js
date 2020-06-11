module.exports = {
    DB_NAME: process.env.DB_NAME || 'shop',

    DB_PRODUCTS_TABLE: process.env.DB_PRODUCTS_TABLE || 'products',
    DB_TOKENS_TABLE: process.env.DB_TOKENS_TABLE || 'tokens',
    DB_USERS_TABLE: process.env.DB_USERS_TABLE || 'users',

    DB_DIALECT: 'mysql',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    DB_USERNAME: process.env.DB_USERNAME || 'root'
}
