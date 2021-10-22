import express, { Request, Response, NextFunction } from "express";
import createError, { HttpError } from 'http-errors';
import { ObjectId } from 'mongodb';
import { Validator } from "../validations/Validator.validation";
import { UserModel } from "../models/User.model";
import { Controller } from '../interfaces/Controller.interface';


export class AuthController implements Controller{
  readonly path:string = '/auth';
  router = express.Router();
  constructor(){
    this._initializeRoutes()
  }

  private _initializeRoutes(){
    this.router.post(`${this.path}/login`);
    this.router.post(`${this.path}/register`, this._register);
    this.router.post(`${this.path}/refresh`);
  }

  private _register = async(req:Request, res:Response, next:NextFunction):Promise<Response | undefined> => {
    try{
      const {email, password} = await Validator.loginSchema.validateAsync(req.body);
      if(!email || email.length <= 0 || !password || password.length <= 0) throw new createError.Unauthorized();
      const user = new UserModel({_id: new ObjectId(), email, password})
      if(!user) throw new createError.Unauthorized();
      user.save();
      return res.send({user});
    }catch (error){
      next(error)
    }
  }
}
