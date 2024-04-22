import express,{ Router } from "express";
import {AnalyticRoute} from '../Routes/Anaytic'
import { EnterExpenseRoute } from "../Routes/EnterExpense";
import { MonthlyRoute } from "../Routes/Monthly";

const ExpenseRouter = Router();

ExpenseRouter.use('/analytic', AnalyticRoute);
ExpenseRouter.use('/enterexpense', EnterExpenseRoute);
ExpenseRouter.use('/monthly',MonthlyRoute)



export {ExpenseRouter}