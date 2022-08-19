const jwt = require('jsonwebtoken');

const authCheck_middleware = (req, res, next) => {
    //get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token) {
        return res.status(401).json({
            msg: 'No token, auth denied'
        })
    }

    // Verify Token
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
}

module.exports = {authCheck_middleware};