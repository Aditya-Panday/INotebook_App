const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Adityaisagoodb$oy';

// isme jo next hai wo kya krega jo suth.js mai fethuser ke baad wala code hai o run hoga
const fetchuser = (req, res, next) => {
    // get the userfrom the jwt token and add id to req object.
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (errors) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchuser;