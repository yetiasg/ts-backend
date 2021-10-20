import express, { Request, Response, NextFunction } from "express";
import createError from 'http-errors';
import { Validator } from "../validations/Validator.validation";
import { User } from "../models/User.model";
import { ObjectId } from 'mongodb';

export class AuthController{
  path:string = '/auth';
  router = express.Router();
  constructor(){
    this._initializeRoutes()
  }

  private _initializeRoutes(){
    this.router.post(`${this.path}/login`);
    this.router.post(`${this.path}/register`, this._register);
    this.router.post(`${this.path}/refresh`);
  }

  private _register = async(req:Request, res:Response, next:NextFunction) => {
    try{
      const {email, password} = await Validator.loginSchema.validateAsync(req.body);
      const user = new User({_id: new ObjectId(), email, password})
      user.save();
      console.log(user);
      res.send({user});
    }catch (error){
      next(error)
    }
  }
}