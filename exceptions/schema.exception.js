const BaseException = require('./base.exception');
class SchemaException extends BaseException {
    constructor(errors) {
        super('Bad Schema', 'SCHEMA_ERROR', 400);
        if (errors.message) this.message = errors.message;
        this.fields = errors.map(error => {
            const errorName = error?.name;
			const path = error && error.path && error?.path.length ? error.path[0] : ""
            if (errorName == "required") {
                return {  key: errorName, field: error?.argument, description: `Please update data under ${error?.argument} in order to upload the file` }
            }
            return { key: errorName , field: path, description: error?.schema?.message?.[errorName] ? error?.schema?.message?.[errorName] : error.stack };
        });
    }
}
module.exports = SchemaException;