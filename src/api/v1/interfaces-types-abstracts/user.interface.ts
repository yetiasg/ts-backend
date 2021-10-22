import mongodb from 'mongodb';
export interface UserInterface{
  _id?:mongodb.ObjectId,
  email:string,
  password:string
}