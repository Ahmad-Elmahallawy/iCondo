const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode;
    if (!statusCode || parseInt(statusCode) < 100 || parseInt(statusCode) >= 600) {
        statusCode = 500;
    }
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = {
    errorHandler,
};