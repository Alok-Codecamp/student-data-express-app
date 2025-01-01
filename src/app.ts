// @ts-nocheck
// all imported module
import express, { Request, Response, NextFunction, Application } from 'express'
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/errorHandlerMiddlware';
import { promise } from 'zod';
const app: Application = express();
import cookieParser from "cookie-parser";

app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: ['http://localhost:5173'] }));


// app.get('/test', (req, res) => {
//     Promise.reject()
//     // res.send('I am custom created promise')
// })

//application routes

app.get('/api/v1', (req: Request, res: Response) => {
    res.status(200).json({
        server: 'localhost:5000',
        status: 200,
        message: 'Ph-univercity server running on port 5000'
    })
})
app.use('/api/v1', router)

app.use(notFound)



app.use(globalErrorHandler)
export default app;
