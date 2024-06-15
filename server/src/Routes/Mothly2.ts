import { Router } from 'express'
import {z} from 'zod';
import { authMiddleware } from '../Middlewares/AuthMiddleWare';
import { prisma } from '../PrimsaClient';
const MonthlyRoute = Router();


// interface monthlyDataResponse{
//     totalSpent: number,

// }


MonthlyRoute.post('/',authMiddleware,async(req,res)=>{

    const monthlySchema= z.object({
        month: z.number().int().gt(0,{message:"Month should be grater than 0"}).lt(13,{message:"Month should be less than 13"}),
        year:z.number().int().gt(2023,{message:"Year should be grater than 2023"})
    });

    const parsedData = monthlySchema.safeParse(req.body);
    if(!parsedData.success){
        return res.status(403).json({"message": "Enter valid data"});
    }

    try {

        const data = await prisma.expenditure.findMany({
            where:{
                userId:req.body.userId,
                month: parsedData.data.month,
                year: parsedData.data.year
            },
            select:{
                date: true,
                time: true,
                amount: true,
                tagName: true,
                tagIcon: true
            }
        })

        console.log(data);
        let monthlyData = new Array();
        data.forEach(data=>monthlyData.unshift(data)); 

        // calculating total spent in the month

        let currentDate = monthlyData[0].date;
        const dataResponse = new Map<String, Object[] >();
        let spendsInADay = new Array();
        let spent;
        for(let i=0; i<monthlyData.length;i++){

            if(currentDate == monthlyData[i].date)
                {
                    spent = {
                        time: monthlyData[i].time,
                        amount: monthlyData[i].amount,
                        tagName: monthlyData[i].tagName,
                        tagIcon: monthlyData[i].tagIcon
                    }
                    
                    spendsInADay.push(spent);
                    
                    
                }
                else{
                    dataResponse.set(currentDate, spendsInADay)
                    spendsInADay = new Array();
                    currentDate = monthlyData[i].date;
                }
        }



        return res.send(dataResponse);

        







        

        
    } catch (error) {
        console.log("Error getting the data", error);
        
    }

    













})

export {MonthlyRoute}