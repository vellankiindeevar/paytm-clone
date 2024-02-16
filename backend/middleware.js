const { JWT_SECRETS } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message: 'not a token key'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRETS);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({message: err});
    }
};

module.exports = {
    authMiddleware
}
