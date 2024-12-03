const BaseException = require('./base.exception');

class InvalidRequestException extends BaseException {
	constructor(param) {
		super(`Bad request: Invalid request ${param}`, 'PARAM_ERROR', 400);
	}
}

module.exports = InvalidRequestException;
