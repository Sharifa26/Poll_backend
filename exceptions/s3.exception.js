const BaseException = require('./base.exception');

class S3Exception extends BaseException {
	constructor(param) {
		super(`Bad S3 Request: Missing/Invalid request ${param}`, 'ERROR', 404);
	}
}

module.exports = S3Exception;
