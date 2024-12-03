const BaseException = require('./base.exception');

class InvalidFileException extends BaseException {
	constructor(param) {
		super(`Bad request: Invalid file ${param}`, 'FILE_ERROR', 400);
	}
}

module.exports = InvalidFileException;
