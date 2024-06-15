import express,{ Router } from "express";
import {AnalyticRoute} from '../Routes/Anaytic'
import { EnterExpenseRoute } from "../Routes/EnterExpense";
import { MonthlyRoute } from "../Routes/Mothly2";

const ExpenseRouter = Router();

ExpenseRouter.use('/analytic', AnalyticRoute);
ExpenseRouter.use('/enterexpense', EnterExpenseRoute);
ExpenseRouter.use('/monthly',MonthlyRoute)



export {ExpenseRouter}