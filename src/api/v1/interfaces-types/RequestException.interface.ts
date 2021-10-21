import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface RequestException extends Request{
  payload?: JwtPayload
}