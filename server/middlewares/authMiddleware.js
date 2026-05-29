const jwt = require("jsonwebtoken");

const authMiddleware = async(req, res, next ) =>{
    try{
        // get token from headers
        const token = req.headers.authorization.split(" ")[1];
        //verify token
        console.log("token", token);
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
        console.log(verifiedToken);
        // attach userId to request
        req.user = verifiedToken;
        
        next();

    }
    catch(error){
        res.status(401).send({
            status:false,
            message:"Token Invalid"
        })
    }
}

module.exports = authMiddleware;