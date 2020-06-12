module.exports = {
    // Bad request
    NOT_VALID_ID: {
      message: 'Not valid id',
      code: 4001
    },

    NO_TOKEN: {
        message: 'No token',
        code: 4002
    },

    NO_VALID_FILE: {
        message: (fileName) => `File ${fileName} is not valid`,
        code: 4003
    },

    TOO_BIG_FILE: {
        message: (fileSize) => `Max file size is ${fileSize / 1048576} Mb`,
        code: 4004
    },

    WRONG_FILE_TYPE: {
        message: 'Only image files are allowed',
        code: 4005
    },

    WRONG_FILE_COUNT: {
        message: 'You can upload only one file for avatar',
        code: 4006
    },


    // Unauthorized
    NOT_VALID_TOKEN: {
        message: 'Not valid token',
        code: 4011
    },

    // Forbidden

    // Not found
    NOT_FOUND: {
        message: 'Record not found',
        code: 4041
    }
}
