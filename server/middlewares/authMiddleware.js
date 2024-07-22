const jwt = require('jsonwebtoken');

const authMidleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if(!token) {
        return res.status(401).json({err: 'Authentication required'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err){
        console.log(err);
      res.status(401).json({err: 'Invalid token'});
    }
};

module.exports = authMidleware;