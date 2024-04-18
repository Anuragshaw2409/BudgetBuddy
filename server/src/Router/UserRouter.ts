import express,{ Router } from "express";
const UserRouter = Router();
import { signInRoute } from "../Routes/Signin";
import { signUpRoute } from "../Routes/Signup";

UserRouter.use('/signin', signInRoute);
UserRouter.use('/signup', signUpRoute);


// UserRouter.use('/signup',)


export {UserRouter}