const BaseException = require('./base.exception');

class PreconditionFailedException extends BaseException {
	constructor() {
		super(`Precondition Failed`, 'PRECONDITION_ERROR', 412);
	}
}

module.exports = PreconditionFailedException;