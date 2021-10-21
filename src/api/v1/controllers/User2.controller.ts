import express, { Request, Response } from "express";
import { Controller } from '../interfaces-types/Controller.interface';


export class UserController2 implements Controller{
  public readonly path: string = '/user2';
  public router = express.Router();
  constructor(){
    this._initializeRoutes();
  }

  _initializeRoutes(){
    this.router.get(`${this.path}`, this._getUser);
    this.router.get(`${this.path}/aaa`, this._getUserA);
    this.router.get(`${this.path}/bbb`, this._getUserB);
  }

  private _getUser = (req:Request, res:Response) => {
    res.json({user: 'user2'})
  }

  private _getUserA = (req:Request, res:Response) => {
    res.json({user: 'a2'})
  }

  private _getUserB = (req:Request, res:Response) => {
    res.json({user: 'b2'})
  }
}