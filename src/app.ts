// @ts-nocheck
// all imported module
import express, { Request, Response, NextFunction, Application } from 'express'
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/errorHandlerMiddlware';
const app: Application = express();

app.use(express.json());
app.use(cors());



//application routes
app.use('/api/v1', router)

app.use(notFound)



app.use(globalErrorHandler)
export default app;
