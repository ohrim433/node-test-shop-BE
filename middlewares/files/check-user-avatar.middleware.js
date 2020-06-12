const {
    mimeTypes: {DOC_MIMETYPES, PHOTO_MIMETYPES},
    fileSizes: {MAX_PHOTO_SIZE},
    responceStatusCodes: {BAD_REQUEST}
} = require('../../constants');
const {
    ErrorHandler,
    errors: {NO_VALID_FILE, TOO_BIG_FILE, WRONG_FILE_TYPE, WRONG_FILE_COUNT}
} = require('../../errors');

module.exports = (req, res, next) => {
    if (!req.files) {
        next();
    }

    const files = Object.values(req.files);

    for (const file of files) {
        const {size, mimetype, name} = file;
        req.photos = [];

        if (PHOTO_MIMETYPES.includes(mimetype)) {
            if (size > MAX_PHOTO_SIZE) {
                next(new ErrorHandler(TOO_BIG_FILE.message(MAX_PHOTO_SIZE), BAD_REQUEST, TOO_BIG_FILE.code));
            } else if (req.photos.length > 1) {
                next(new ErrorHandler(WRONG_FILE_COUNT.message, BAD_REQUEST, WRONG_FILE_COUNT.code));
            }
            req.photos.push(file);

        } else if (DOC_MIMETYPES.includes(mimetype)) {
                next(new ErrorHandler(WRONG_FILE_TYPE.message, BAD_REQUEST, WRONG_FILE_TYPE.code));

        } else {
            next(new ErrorHandler(NO_VALID_FILE.message(name), BAD_REQUEST, NO_VALID_FILE.code));
        }
    }

    next();
};
