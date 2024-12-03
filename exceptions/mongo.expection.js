const BaseException = require('./base.exception');

class MongoException extends BaseException {
	constructor(param) {
		super(`Bad request: ${param}`, 'PARAM_ERROR', 500);
	}
}

module.exports = MongoException;
