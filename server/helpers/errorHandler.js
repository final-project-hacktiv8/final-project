module.exports = (err,req,res,next) => {
    let statusCode = err.statusCode || 500
    let message = err.message
    if (err.name === "ValidationError"){
        let key = Object.keys(err.errors)
        statusCode = 400;
        message = err.errors[key[0]].message; 
    }
    if (err.name === "MongoError"){
        statusCode = 409;
        message = 'email already used'
    }
    if(err.message === 'jwt malformed'){
        statusCode = 401
        message = "Token isn't valid"
    }

    res.status(statusCode).json({statusCode, message})
}