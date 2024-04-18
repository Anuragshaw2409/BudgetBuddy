import express,{ Router } from "express";
import {AnalyticRoute} from '../Routes/Anaytic'
import { EnterExpenseRoute } from "../Routes/EnterExpense";

const ExpenseRouter = Router();

ExpenseRouter.use('/analytic', AnalyticRoute);
ExpenseRouter.use('/enterexpense', EnterExpenseRoute);



export {ExpenseRouter}