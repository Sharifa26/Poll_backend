const BaseException = require('./base.exception');

class InvalidParamException extends BaseException {
	constructor(param) {
		super(`Bad request: Invalid param ${param}`,`PARAM_ERROR`,400)
	}
}

module.exports = InvalidParamException;