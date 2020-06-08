module.exports = {
    DATABASE: process.env.DATABASE || 'shop',
    PRODUCTS_TABLE: process.env.PRODUCTS_TABLE || 'products',
    USERS_TABLE: process.env.USERS_TABLE || 'users',
    TOKENS_TABLE: process.env.TOKENS_TABLE || 'tokens',
    USERNAME: process.env.USERNAME || 'root',
    PASSWORD: process.env.PASSWORD || 'CKT2altAE091010F',
    HOST: process.env.HOST || 'localhost',
    DIALECT: process.env.DIALECT || 'mysql'
}
