const jwt= require("jsonwebtoken");

const authMiddlwware=(req,resp,next)=>{
    const token=req.headers["authorization"];
    if(!token){
        return resp.status(401).json({message:"Unauthorized: No token provided"});
    }
    jwt.verify(token.split(" ")[1],"secretkey",(err,decoded)=>{
        if(err){
            return resp.status(401).json({message:"Unauthorized: Invalid token"});
        }
        req.user=decoded;
        next();
    });
};

const adminMiddleware=(req,resp,next)=>{
    if(!req.user.isAdmin){
        return resp.status(403).json({message:"Forbidden: Admin access required"});
    }
    next();
};

module.exports={authMiddlwware,adminMiddleware};