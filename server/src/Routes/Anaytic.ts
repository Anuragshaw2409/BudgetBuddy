import { Router } from 'express'
import Z from 'zod';
import { authMiddleware } from '../Middlewares/AuthMiddleWare';
import { prisma } from '../PrimsaClient';
const AnalyticRoute = Router();

AnalyticRoute.get('/', authMiddleware, async (req, res) => {
    const prismaClient = prisma;
    const user = req.body.userId;
    const analyticSchema = Z.object({
        month: Z.number(),
        year: Z.number()
    });
    try {

        const parsingResult = analyticSchema.safeParse(req.body);
        if (!parsingResult.success)
            return res.json({ success: false, message: "Enter correct values" });
        const selectedMonth = parsingResult.data.month;
        const selectedYear = parsingResult.data.year;

        const expenses = await prismaClient.expenditure.findMany({
            where: {
                userId: req.body.userId,
                month: selectedMonth,
                year: selectedYear

            },
            select: {
                date: true,
                month:true,
                amount: true,
                tagIcon: true,
                tagName: true
            }
        });
        
        prismaClient.$disconnect();
        // Calculate Highest Spent
        
        let dayWiseTotalSpent = new Array(new Date(selectedYear, selectedMonth, 0).getDate() + 1).fill(0);
        
        expenses.forEach((expense) => {
            dayWiseTotalSpent[expense.date] += expense.amount
        });
        let highestSpentAmount=0;
        let highestSpentDay = 0;

        for(let i=0; i<dayWiseTotalSpent.length;i++){
            if(highestSpentAmount<dayWiseTotalSpent[i]){
                highestSpentAmount = dayWiseTotalSpent[i];
                highestSpentDay = i;
            }
        }

       
        

        // Most entries calculation
        let tagNames = new Array();
        let tagIcons = new Array();

        expenses.forEach((expense) => {
            let found = false;
            for (let i = 0; i < tagNames.length; i++) {
                if (expense.tagName == tagNames[i]) {
                    found = true;
                    break;
                }
                else
                    continue;
            }
            if (!found)
                {tagNames.push(expense.tagName);;
                tagIcons.push(expense.tagIcon);
                }

        });
        let tagEntries = new Array(tagNames.length).fill(0);
        let spentOnTags = new Array(tagNames.length).fill(0);

        expenses.forEach((expense) => {
            for (let i = 0; i < tagNames.length; i++) {
                if(expense.tagName == tagNames[i])
                    {
                        tagEntries[i]++;
                        spentOnTags[i]+=expense.amount;

                    }
            }
        });

        // finding highest entries
        let highestEntried = 0;
        let index = 0;
        for(let i = 0; i<tagEntries.length;i++){
            if(highestEntried<tagEntries[i])
                {highestEntried = tagEntries[i];
                 index = i;
                }
        }
        
        const response = {
            highestSpent:{
                date: highestSpentDay,
                amount: highestSpentAmount
            },
            mostEntry:{
                numberOfEntries: highestEntried,
                amount: spentOnTags[index],
                tag: [tagNames[index],tagIcons[index]]
            },
            expense: dayWiseTotalSpent,
            entries:
                tagNames.map((tag, index)=>{
                    const output={
                        tag: [tagIcons[index],tagNames[index]],
                        entries: tagEntries[index],
                        amount: spentOnTags[index]
                        
                    }
                    return output;
                })
            
        };
        return res.send(response);
        
    } catch (error) {
        return res.json(error);

    }


})


export { AnalyticRoute }