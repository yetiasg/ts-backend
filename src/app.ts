import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import config from './config/config';
import { Controller } from './api/v1/interfaces-types-abstracts/Controller.interface';

import { routeDoesNotExist } from './api/v1/middlewares/routeDoesNotExist.middleware';
import {  errorHandler } from './api/v1/middlewares/error.middleware';

export class App{
  public app: express.Application;
  constructor(controllers:Controller[], public port:number){
    this.app = express();
    this._connectToDatabase();
    this._initializeMiddlewares();
    this._initializeControllers(controllers);
    this.app.use(errorHandler);
    this.app.use(routeDoesNotExist)
  }

  private _connectToDatabase(){
    mongoose.connect(`${String(config.database.DB_HOST)}/back_ts`, () => {
      console.log("connected")
    })
  }

  private _initializeMiddlewares(){
    this.app.use(morgan('dev'));
    this.app.use(cors({
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    this.app.use(helmet());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
  }

  private _initializeControllers(controllers:Controller[]){
    controllers.forEach((controller:Controller) => {
      this.app.use('/', controller.router)
    })
  }

  public listen(){
    this.app.listen(this.port, () => {
      console.log(`Listening on port: ${this.port}`);
    });
  }
}

