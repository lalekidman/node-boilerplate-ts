import {Request, Response, NextFunction, Router} from 'express'
import * as HttpStatus from 'http-status'
import {ErrorCodes, HttpErrorResponse, SuccessResponse} from '@app/common/http-response'
import {
  UserCreateUsecase
} from '@app/domain/user/usecases'
export default class AppController {
  
  public addRoute = (req: Request, res: Response, next: NextFunction) => {
    const {
      firstName = '',
      lastName = '',
    } = req.body
    // new UserCreateUsecase()
    //   .execute({
    //     firstName,
    //     lastName,

    //   })
    //   .then((user) => {
    //     res.status(HttpStatus.CREATED).send(SuccessResponse(user))
    //   })
    //   .catch((error) => {
    //     // ## TODO ##
    //     // - how could I support the error from the throw?
    //     new HttpErrorResponse(res, HttpStatus.BAD_REQUEST)
    //       .track(ErrorCodes.CREATE_USER_DETAILS_FAILED)
    //       .throw()
    //   })
  }
  public updateRoute = (req: Request, res: Response, next: NextFunction) => {
  }
  public listRoute = (req: Request, res: Response, next: NextFunction) => {
  }
  public detailsRoute = (req: Request, res: Response, next: NextFunction) => {
  }
}