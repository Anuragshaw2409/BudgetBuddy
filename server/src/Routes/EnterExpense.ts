import {Router} from 'express'
import Z from 'zod'
import { prisma } from '../PrimsaClient'
import { authMiddleware } from '../Middlewares/AuthMiddleWare';



const EnterExpenseRoute = Router();

EnterExpenseRoute.post('/',authMiddleware,async(req,res)=>{
    const prismaClient = prisma;

    
        
        const expenseEntrySchema = Z.object({
            
            
            amount: Z.number(),
            tagIcon: Z.string().min(1,{message:"Enter valid tag"}),
            tagName: Z.string().min(1,{message:"Enter valid tag"})
            
        });
        const parsingResult = expenseEntrySchema.safeParse(req.body);
        if(!parsingResult.success)
            return res.status(400).json({success: false, message: "Enter valid data"})

        
        
        try {
            
            const result = await prismaClient.expenditure.create({
                data:{
                    userId: req.body.userId,
                    time: new Date().toLocaleTimeString(),
                    date: new Date().getDate(),
                    year: new Date().getFullYear(),
                    month: new Date().getMonth()+1,
                    amount: parsingResult.data.amount,
                    tagIcon: parsingResult.data.tagIcon,
                    tagName: parsingResult.data.tagName,
                },
                select:{
                id:true,
                amount:true
            }
        })
        await prismaClient.$disconnect();
        return res.json({success: true, message:"Expense Added Successfuly"});
    
        
    } catch (error) {
        return res.status(500).json(error);
    }
        
})

export {EnterExpenseRoute}