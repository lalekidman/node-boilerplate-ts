import { Request, Response, NextFunction } from 'express';
import passport from 'passport'
import HttpStatus from 'http-status'

import { HttpErrorResponse, ErrorCodes } from '@app/common/http-response';

const JWTAuthBearerHandler = (req: Request, res: Response, next: NextFunction) => () => (error: any, data: any, errCode: any) => {
  const UnauthorizedHttpResponse = new HttpErrorResponse(res, HttpStatus.UNAUTHORIZED)
  if (errCode) {
    UnauthorizedHttpResponse
      .track(ErrorCodes.INVALID_ACCESS_TOKEN_FORMAT)
      .throw()
    return
  } else if (error) {
    UnauthorizedHttpResponse
      .track(ErrorCodes.ACCESS_TOKEN_EXPIRED)
      .throw()
    return
  } else {
    req.user = data
    next()
  }
}

export const JWTAuthBearer = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    return passport.authenticate([
      'jwt'
    ], {session: false}, JWTAuthBearerHandler(req, res, next)) (req, res, next)
  }
}
