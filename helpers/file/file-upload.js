const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const {dbNames: {DB_PRODUCTS_TABLE, DB_USERS_TABLE}} = require('../../constants');
const {userService, productService} = require('../../services');

module.exports = async (type, rootFolder, fileType, tableType, userId, productId) => {
    const fileExtension = type.name.split('.').pop();
    const fileDir = `${rootFolder}/${userId}/${fileType}`;
    const fileName = `${uuid}.${fileExtension}`;

    await fs.mkdir(path.resolve(process.cwd(), 'public', fileDir), {recursive: true});
    await type.mv(path.resolve(process.cwd(), 'public', fileDir, fileName));

    if (tableType === DB_USERS_TABLE) {
        await userService.updateUser(userId, {photo: `/${fileDir}/${fileName}`});
    } else if (tableType === DB_PRODUCTS_TABLE) {
        await productService.updateProduct(
            productId,
            {
                photo: `/${fileDir}/${fileName}`,
                createdBy: userId
            }
        );
    }
}
