const BaseException = require('./base.exception');

class NotFoundException extends BaseException {
	constructor(param) {
		super(`Not Found resource for ${param}`, 'NOT_FOUND', 404);
	}
}

module.exports = NotFoundException;
