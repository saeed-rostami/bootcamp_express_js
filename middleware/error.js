const ErrorResponse = require("../utilities/ErrorResponse");

const errorHandler = (err, request, result, next) => {
    let error = {...err};
    error.message = err.message;

    console.log(err.value);
    //Mongoose bad Obj id
    if (err.name === "CastError") {
        const message = `Bootcamp Not Found by Id ${error.value}`;
        error = new ErrorResponse(message, 422);
    }
    //Mongoose Duplicate key
    if (err.code === 11000) {
        const message = "Duplicate field value Entered";
        error = new ErrorResponse(message, 422);
    }

    //Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 422);
    }
    result.status(error.statusCode || 500).json({success: false, msg: error.message || "Server Error"});
};


module.exports = errorHandler;