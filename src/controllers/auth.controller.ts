import {Request, Response, NextFunction, Router} from 'express'
import * as HttpStatus from 'http-status'
export class AuthController {
  
  public detailsRoute = (req: Request, res: Response, next: NextFunction) => {
    // @ts-expect-error
    const user = req.session.passport?.user
    console.log('req.session :>> ', req.session);
    res
      .status(HttpStatus.OK)
      .send(user);
  }
}