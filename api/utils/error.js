export const errorHandler = (statusCode, message) => {//creating error object and assign values and return
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};