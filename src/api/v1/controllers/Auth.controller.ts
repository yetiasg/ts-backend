import express, { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { ObjectId } from 'mongodb';
import { Validator } from "../validations/Validator.validation";
import { User } from "../models/User.model";
import { Controller } from '../interfaces-types/Controller.interface';


export class AuthController implements Controller{
  readonly path:string = '/auth';
  router = express.Router();
  constructor(){
    this._initializeRoutes()
  }

    _initializeRoutes(){
    this.router.post(`${this.path}/login`);
    this.router.post(`${this.path}/register`, this._register);
    this.router.post(`${this.path}/refresh`);
  }

  private _register = async(req:Request, res:Response, next:NextFunction) => {
    try{
      const {email, password} = await Validator.loginSchema.validateAsync(req.body);
      if(!email || email.length <= 0 || !password || password.length <= 0) return new createError.Unauthorized();
      const user = new User({_id: new ObjectId(), email, password})
      if(!user) return new createError.Unauthorized();
      user.save();
      res.send({user});
    }catch (error){
      next(error)
    }
  }
}
