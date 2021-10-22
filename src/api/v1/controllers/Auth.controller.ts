import express, { Request, Response, NextFunction } from "express";
import createError, { HttpError } from 'http-errors';
import { ObjectId } from 'mongodb';
import { Validator } from "../validations/Validator.validation";
import { UserModel } from "../models/User.model";
import { Controller } from '../interfaces/Controller.interface';
import { UserInterface } from "../interfaces/user.interface";

export class AuthController implements Controller{
  public readonly path:string = '/auth';
  public router = express.Router();
  private User = UserModel;
  constructor(){
    this._initializeRoutes()
  }

  private _initializeRoutes(){
    this.router.post(`${this.path}/login`, this._login);
    this.router.post(`${this.path}/register`, this._register);
    this.router.post(`${this.path}/refresh`);
  }

  private _register = async(req:Request, res:Response, next:NextFunction):Promise<Response | undefined> => {
    try{
      const userData:UserInterface = await Validator.loginSchema.validateAsync(req.body);
      const { email, password } = userData
      if(!email || email.length <= 0 || !password || password.length <= 0) throw new createError.Unauthorized();
      const user = new this.User({_id: new ObjectId(), email, password})
      if(!user) throw new createError.Unauthorized();
      user.save();
      return res.status(200).json({user});
    }catch (error){
      next(error)
    }
  }

  private _login = async(req:Request, res:Response, next:NextFunction) => {
    try{
      return res.status(200).json({loggedIn: true})
    }catch(error){
      next(error)
    }
  }
}
