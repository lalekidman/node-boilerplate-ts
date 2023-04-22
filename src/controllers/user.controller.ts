import {Request, Response, NextFunction, Router} from 'express'
import http from 'axios'
import * as HttpStatus from 'http-status'
import {ErrorCodes, HttpErrorResponse, SuccessResponse} from '@app/common/http-response'
import { GOOGLE_API_CLIENT_KEY } from '@app/common/constants';
import { OAuth2Client } from 'google-auth-library';
import { UserCreateUsecase, UserUpdateUsecase } from '@app/domain/user/usecases'
export default class AppController {
  private googleClient = new OAuth2Client(GOOGLE_API_CLIENT_KEY);

  public updateRoute = async (req: Request, res: Response, next: NextFunction) => {

    const {
      firstName = '',
      lastName = '',
      address = {}
    } = req.body
    
    const updatedUser = await new UserUpdateUsecase().update(req.user._id, {
      firstName,
      lastName,
      // implement more.
    })

    res.
      status(HttpStatus.ACCEPTED)
      .send(updatedUser)
  }
  public listRoute = (req: Request, res: Response, next: NextFunction) => {
  }
  public detailsRoute = (req: Request, res: Response, next: NextFunction) => {
    res.send(req.user);
  }
  public registerOrLoginRoute = async (req: Request, res: Response, next: NextFunction) => {
    const {
      token = ''
    } = req.body
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_API_CLIENT_KEY,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
    // const response = await http(
    //   "https://www.googleapis.com/userinfo/v2/me",
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );
    // const profile = response.data
    console.log('profile :>> ', payload);
    return payload
  }
}