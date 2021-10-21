import express from 'express';

export interface Controller {
  path:string,
  router:express.Router,
  _initializeRoutes():void,
}