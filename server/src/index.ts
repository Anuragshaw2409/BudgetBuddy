// const express = require ('express')
import express from 'express'
import dotenv  from 'dotenv'
dotenv.config();
const PORT = process.env.PORT;
import {UserRouter} from './Router/UserRouter'
import {ExpenseRouter} from './Router/ExpenseRouter'
import cors from 'cors';



const app = express()
app.use(cors());
app.listen(PORT, ()=>console.log("Listening on port:", PORT))
app.use(express.json())

app.use('/api/v1/user',UserRouter)
app.use('/api/v1/expense',ExpenseRouter)

app.get('/',(req,res)=>{
    res.send("Hello World")
})
