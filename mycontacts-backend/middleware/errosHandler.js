const {constants} = require('../constants')

const errorHandler = (err,req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case 400:
            res.json({titel:'validation failed',message:err.message, stackTrace:err.stack});
        break ;
        case constants.NOT_FOUND:
            res.json({titel:'not found',message:err.message, stackTrace:err.stack});
        break ;
        case  constants.FORBIDDEN:
            res.json({titel:'forbidden',message:err.message, stackTrace:err.stack});
        break ;
        case  constants.UNAUTHORIZED:
            res.json({titel:'unauthorized',message:err.message, stackTrace:err.stack});
        break ;
        default:
            console.log('No Error all goods')
         break
    }
}

module.exports = errorHandler