import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import config from './config/config';
import { Controller } from './api/v1/interfaces/Controller.interface';

import { routeDoesNotExist } from './api/v1/middlewares/routeDoesNotExist.middleware';
import { errorHandler } from './api/v1/middlewares/error.middleware';

export class App{
  public app: express.Application;

  constructor(controllers:Controller[], public readonly port:number){
    this.app = express();

    this._connectToTheDatabase();
    this._initializeMiddlewares();
    this._initializeControllers(controllers);
    this._initializeNotFoundHandler();
    this._initializeErrorHandling();
  }

  private _connectToTheDatabase = () => {
    mongoose.connect(`${String(config.database.DB_HOST)}/back_ts`, () =>{
      console.log("connected")
    })
  }

  private _initializeMiddlewares = () =>{
    this.app.use(morgan('dev'));
    this.app.use(cors({
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    this.app.use(helmet());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
  }

  private _initializeControllers = (controllers:Controller[]) =>{
    controllers.forEach((controller:Controller) => {
      this.app.use('/', controller.router)
    })
  }

  private _initializeNotFoundHandler = () =>{
    this.app.use(routeDoesNotExist)
  }

  private _initializeErrorHandling = () =>{
    this.app.use(errorHandler);
  }

  public listen(){
    this.app.listen(this.port, () =>{
      console.log(`Listening on port: ${this.port}`);
    });
  }
}

