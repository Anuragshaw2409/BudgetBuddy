
import { Router } from "express";
import JWT from 'jsonwebtoken'
import { PrismaClient } from "@prisma/client";
import Z from 'zod'
import bcryptjs from 'bcryptjs'
import { jwt_secret } from "../config";
const signUpRoute = Router();


signUpRoute.post('/', async (req, res) => {
    
    const prisma = new PrismaClient();
    const signUpSchema = Z.object({
        email: Z.string().email({ message: "Enter a valid email" }),
        firstName: Z.string().min(1, { message: "Enter a valid First Name" }),
        lastName: Z.string().optional(),
        password: Z.string().min(6, { message: "Password must be atleast 6 characters" })
    })
    try {

        const data = req.body;
        const parsingResult = signUpSchema.safeParse(data);
        if (!parsingResult.success) {
            console.log(parsingResult.error);

            return res.status(406).json({ success: false, message: "Invalid Data" });
        }

        const userIfAvailable = await prisma.user.findUnique({
            where: {
                email: parsingResult.data.email
            },
            select: {
                email: true
            }

        });
        if (userIfAvailable)
            return res.status(400).json({ success: false, message: "user already exists" })

        const salt = bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(parsingResult.data.password, salt);

        const createdUser = await prisma.user.create({
            data: {
                email: parsingResult.data.email,
                firstName: parsingResult.data.firstName,
                lastName: parsingResult.data.lastName,
                Password: hashedPassword
            }
        });
        const payload = {data: createdUser.id};
        const token = JWT.sign(payload, jwt_secret);
        if (createdUser)
            return res.status(200).json({ success: true, message: "User Created successfuly", token: "bearer "+token });


    }
    catch (error) {
        return res.json({ message: "Error happened", success: false, error });

    }

})






export { signUpRoute }