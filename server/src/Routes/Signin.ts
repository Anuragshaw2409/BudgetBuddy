import { Router } from "express";
import JWT from 'jsonwebtoken'
import {prisma} from '../PrimsaClient'
import Z from 'zod'
import bcryptjs from 'bcryptjs'
import { jwt_secret } from "../config";
const signInRoute = Router();


signInRoute.put('/', async (req, res) => {
    const prismaClient = prisma;
    
    const signInSchema = Z.object({
        email: Z.string().email({ message: "Enter a valid email" }),
        password: Z.string().min(6, { message: "Invalid Credentials" })
    })
    try {

        const data = req.body;
        const parsingResult = signInSchema.safeParse(data);
        if (!parsingResult.success) {
            console.log(parsingResult.error);

            return res.status(406).json({ success: false, message: "Invalid Data" });
        }

        const userIfAvailable = await prismaClient.user.findUnique({
            where: {
                email: parsingResult.data.email
            },
            select: {
                email: true,
                id: true,
                Password: true
            }

        });
        if (!userIfAvailable)
            return res.status(401).json({ success: false, message: "Email does not exists" })
        
        const checkHash = bcryptjs.compareSync(parsingResult.data.password, userIfAvailable.Password)
        if(!checkHash)
            return res.status(401).json({ success: false, message: "Invalid Credentials" })
        


        const payload = {data: userIfAvailable.id};
        const token = JWT.sign(payload, jwt_secret);
        return res.status(200).json({ success: true, message: "Log in successful", token: "bearer "+token });


    }
    catch (error) {
        return res.status(500).json({ message: "Error happened", success: false, error });

    }

})


export {signInRoute}
