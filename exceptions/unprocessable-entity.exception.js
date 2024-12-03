const BaseException = require('./base.exception');

class UnprocessableEntityException extends BaseException {
	constructor(conf) {
		super(`Unprocessable Entity: Missing ${conf}`, 'UNPROCESSABLE_ENTITY_ERROR', 422);
	}
}

module.exports = UnprocessableEntityException;
