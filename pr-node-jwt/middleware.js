const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, 'jwt_secret');
        return next();
    } catch(e){
        if(e.name === 'TokenExpiredError'){
            return res.status(419).end(); //토큰 만료
        }

        return res.status(401).end(); //유효하지 않은 토큰
    }
};