import 'express-async-errors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routeNotFoundError from './app/middlewares/routeNotFoundError';
import { AuthRouter } from './app/modules/auth/auth.route';

const app: Application = express();

app.use(cors());  
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
});

// routes
app.get('/', (req:Request, res:Response) => {
  res.send('HELLO WORLD')
});

app.use('/api/v1/auth', AuthRouter);
app.use(globalErrorHandler);
app.use(routeNotFoundError);

export default app;