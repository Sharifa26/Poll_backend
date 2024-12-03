class BaseException extends Error {
    constructor(message, code, statusCode = 500) {
        if (!message) {
            message = 'Oops!!! Something went wrong';
        }
        super(message);
        this.statusCode = statusCode;
        this.code = code || 'ERROR';
    }

}
module.exports = BaseException