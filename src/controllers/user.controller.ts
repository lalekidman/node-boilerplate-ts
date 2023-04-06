import {Request, Response, NextFunction, Router} from 'express'
import * as HttpStatus from 'http-status'
import {ErrorCodes, HttpErrorResponse, SuccessResponse} from '@app/common/http-response'
export default class AppController {
  
  public updateRoute = (req: Request, res: Response, next: NextFunction) => {
  }
  public listRoute = (req: Request, res: Response, next: NextFunction) => {
  }
  public detailsRoute = (req: Request, res: Response, next: NextFunction) => {
    console.log('req.user :>> ', req.user);
    res.send(req.user);
  }
}