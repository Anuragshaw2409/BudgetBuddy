import JWT, { JwtPayload } from 'jsonwebtoken'
import { jwt_secret } from '../config'

function authMiddleware(req: any,res: any,next:any){
    const authorization = req.headers.authorization;
    const token = authorization.substring(7)
    if(!token)
        return res.status(403).json({sccess: false, message: "Unauthorized"});
    try {
        
        const result= JWT.verify(token, jwt_secret) as JwtPayload;
        if(!result)
            return res.status(401).json({success: false, message: "Unauthorized"})
        req.body.userId = result.data;
        next();
        
        
    } catch (error) {
        return res.status(403).json({success: false, message:"Unauthorized"});
    }



}


export{authMiddleware}