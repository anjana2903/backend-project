module.exports = function (err, req, res, next) {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    let success = err.success || false;

    if (process.env.NODE_ENV === "development") {
        return res.status(statusCode).json({
            success,
            error: message,
            stack: err.stack,
        });
    } else {
        return res.status(statusCode).json({
            success,
            error: message,
        });
    }
};