const BaseException = require('./base.exception');

class JreBadRuleException extends BaseException {
	constructor(param) {
		super(`Failed JRE rule: ${param}`, 'JRE_RULE_ERROR', 400);
	}
}

module.exports = JreBadRuleException;
