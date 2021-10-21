import express, { Request, Response } from "express";
import { JwtService } from "../services/JwtService.service";
import { Controller } from '../interfaces-types/Controller.interface';


export class UserController{
  public readonly path: string = '/user'
  public router = express.Router();
  constructor(){
    this._initializeRoutes()
  }

  private _initializeRoutes(){
    this.router.get(`${this.path}/`, JwtService.verifyAccessToken , this._getUser);
    this.router.get(`${this.path}/aaa`, this._getUserA);
    this.router.get(`${this.path}/bbb`, this._getUserB)
  }

  private _getUser = (req:Request, res:Response) => {
    res.json({user: 'user'})
  }

  private _getUserA = (req:Request, res:Response) => {
    res.json({user: 'a'})
  }

  private _getUserB = (req:Request, res:Response) => {
    res.json({user: 'b'})
  }

}