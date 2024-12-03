const BaseException = require('./base.exception');

class InvalidAuthenticationException extends BaseException {
    constructor(authentication) {
        super(`Bad request: Invalid Authentication ${authentication}`, 'AUTHENTICATION_ERROR', 401);
    }
}

module.exports = InvalidAuthenticationException;
