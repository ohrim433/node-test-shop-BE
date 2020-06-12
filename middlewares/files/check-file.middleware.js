const {responceStatusCodes: {BAD_REQUEST}} = require('../../constants');
const {ErrorHandler, errors: {NO_VALID_FILE, TOO_BIG_FILE}} = require('../../errors');

const {
    mimeTypes: {DOC_MIMETYPES, PHOTO_MIMETYPES},
    fileSizes: {MAX_DOC_SIZE, MAX_PHOTO_SIZE}
} = require('../../constants');

module.exports = (req, res, next) => {
    req.photos = [];
    req.docs = [];

    if (!req.files) {
        next();
    }

    const files = Object.values(req.files);

    for (const file of files) {
        const {size, mimetype, name} = file;

        if (PHOTO_MIMETYPES.includes(mimetype)) {
            if (size > MAX_PHOTO_SIZE) {
                next(new ErrorHandler(TOO_BIG_FILE.message(MAX_PHOTO_SIZE), BAD_REQUEST, TOO_BIG_FILE.code));
            }
            req.photos.push(file);

        } else if (DOC_MIMETYPES.includes(mimetype)) {
            if (size > MAX_DOC_SIZE) {
                next(new ErrorHandler(TOO_BIG_FILE.message(MAX_DOC_SIZE), BAD_REQUEST, TOO_BIG_FILE.code));
            }
            req.docs.push(file);

        } else {
            next(new ErrorHandler(NO_VALID_FILE.message(name), BAD_REQUEST, NO_VALID_FILE.code));
        }
    }

    next();
};
