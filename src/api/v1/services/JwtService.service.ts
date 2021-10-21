import createError from 'http-errors';
import { Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import JWT from 'jsonwebtoken';
import config from '../../../config/config';

import { RequestException } from '../interfaces-types-abstracts/RequestException.interface';

export class JwtService{
  signAccessToken = (userId: ObjectId) => {
     return new Promise((resolve, reject) => {
      const payload = { userId };
      const secret = String(config.auth.ACCESS_TOKEN_SECRET);
      const options = { expiresIn: `${Number(config.auth.TOKEN_EXPIRATION)}`};
      JWT.sign(payload, secret, options, (err, token) => {
        if(err) return reject(new createError.InternalServerError());
        resolve(token);
      });
     });
  }

  static verifyAccessToken = (req: RequestException, res: Response, next: NextFunction) => {
    if(!req.headers['authorization']) return next(new createError.Unauthorized());
    const token = req.headers['authorization'].split(' ')[1];
    if(!token) return next(new createError.Unauthorized());
    JWT.verify(token, String(config.auth.ACCESS_TOKEN_SECRET), (err, payload) => {
      if(err){
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return next(new createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  }

  signRefreshToken = (userId: ObjectId) => {
    return new Promise((resolve, reject) => {
      const payload = { userId };
      const secret = String(config.auth.REFRESH_TOKEN_SECRET);
      const options = { expiresIn: '1y' };
      JWT.sign(payload, secret, options, (err, token) => {
        if(err) return reject(new createError.InternalServerError());
        resolve(token);
      })
    });
  }

  verifyRefreshRoken = (token: string) => {
    return new Promise((resolve, reject) => {
      JWT.verify(token, String(config.auth.REFRESH_TOKEN_SECRET), (err, payload: any) => {
        if(err){
          const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
          return reject(new createError.Unauthorized(message));
        }
        const userId = payload.userId;
        resolve(userId);
      });
    });
  }
}