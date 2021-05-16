const jwt = require("jsonwebtoken");

var tokenSecret = "^&'[s1t0ken69$!q{}^!7518";

module.exports = async function(req, res, next) {
    try {
        const token = req.cookies.auth;
        if (!token) return res.redirect('/login');
    
        const decoded = jwt.verify(token, tokenSecret);
        next();
    }
    catch (e) {
        console.log("Invalid token");
        return res.redirect('/login');
    }
};