import bcrypt from 'bcrypt';
import createError from 'http-errors';

export class HashingPasswordService{
  static hashPassword = async(password:string) =>{
    try{
      const salt = await bcrypt.genSalt(12);
      return await bcrypt.hash(password, salt);
    }catch (error){
      throw new createError.InternalServerError();
    }
  }

  static comparePassword = async(password:string, hashedPassword:string) => {
    try{
      return await bcrypt.compare(password, hashedPassword);
    }catch (error){
      throw new createError.InternalServerError();
    }
  }
}