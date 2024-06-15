import { Router } from 'express'
import Z from 'zod';
import { authMiddleware } from '../Middlewares/AuthMiddleWare';
import { prisma } from '../PrimsaClient';
const MonthlyRoute1 = Router();

MonthlyRoute1.post('/',authMiddleware,async(req,res)=>{
    const prismaClient = prisma;

    const monthlySchema= Z.object({
        month: Z.number().int().gt(0,{message:"Month should be grater than 0"}).lt(13,{message:"Month should be less than 13"}),
        year:Z.number().int().gt(2023,{message:"Year should be grater than 2023"})
    })
    
    const parsingResult = monthlySchema.safeParse(req.body);
    if(!parsingResult.success)
        return res.status(403).json({success:false, message:"Enter valid data"})

    const user = req.body.userId;

    try {
        
        const monthlyDataUnrev = await prismaClient.expenditure.findMany({
            where:{
                userId:user,
                month: parsingResult.data.month,
                year: parsingResult.data.year
                
            },
            select:{
                date:true,
                time:true,
                amount:true,
                tagName:true,
                tagIcon:true,
            }
        })

        console.log(monthlyDataUnrev);
        
        
        
        let totalSpent=0;
        monthlyDataUnrev.forEach((expense)=>totalSpent+=expense.amount); //Calculated the total expense for the month
        
        
        let monthlyData = new Array();
        monthlyDataUnrev.forEach(data=>monthlyData.unshift(data));  //Saving the expenses in reverse to get newest first
        console.log(monthlyData);



        const lastDate  = monthlyData[0].date;  //Getting the last date

        const expenses = new Array();  //Final array containing the object for all the transactions
        const totalData = monthlyData.length;
        for(let i=lastDate;i>0;i--){
            let transactions = new Array();
            let dateWiseTotalExpense=0;
            for(let j=0;j<totalData;j++){
                if(monthlyData[j].date==i && monthlyData[j].amount>0){
                    dateWiseTotalExpense+=monthlyData[j].amount;
                    transactions.push({
                        tagIcon: monthlyData[j].tagIcon,
                        tagName: monthlyData[j].tagName,
                        time: monthlyData[j].time,
                        amount: monthlyData[j].amount

                    })

                }
                
            }
            if(transactions.length>0)
            expenses.push({
                date:`${i}/${parsingResult.data.month}/${parsingResult.data.year}`,expense:dateWiseTotalExpense,transactions
            })
        }
        


        const response = {
            TotalSpent: totalSpent.toString(),
            expenses
        }

    return res.send(response);
    } catch (error) {
        res.json(error);
    }



});

export{MonthlyRoute1}