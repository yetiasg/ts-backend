import { Request, Response } from "express"

export function routeDoesNotExist(req: Request, res: Response){
  res.status(404).json('This route does not exist')
}