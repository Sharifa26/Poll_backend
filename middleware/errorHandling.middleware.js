const BaseException = require("../exceptions/base.exception");

const errorHandlingMiddleware = async (error, request, response, next) => {
  try {
    const errorObj = {
      success: false,
      message: error.message,
      code: "ERROR",
      stack: error.stack,
    };
    let status = 500;
    if (error instanceof Error) {
      status = error.statusCode || status;
      errorObj.message = error.message;
    }
    if (error instanceof BaseException) {
      errorObj.message = error.message;
       errorObj.fields = error.fields ? error.fields : [];
     errorObj.code = error.code;
    }
    return response.status(error.statusCode).json(errorObj);
  } catch (error) {
    return response.status(500).json({
      message: "Internal server error",
      code: "INTERNAL_ERROR",
    });
  }
};
module.exports = errorHandlingMiddleware;