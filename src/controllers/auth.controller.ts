import {Request, Response, NextFunction} from 'express'
import * as HttpStatus from 'http-status'
import http from 'axios'
import { UserCreateUsecase } from '@app/domain/user/usecases'
import { USER_OAUTH_PROVIDER } from '@app/domain'
import jwt from 'jsonwebtoken'
const jwtSecretKey = process.env.USER_SERVICE_API_SECRET_KEY || '';

export class AuthController {
  public validateAuthenticationRoute = (req: Request, res: Response, next: NextFunction) => {
    // @ts-expect-error
    const user = req.session.passport?.user
    console.log('req.sexssion :>> ', req.session);
    res
      .status(HttpStatus.OK)
      .send(user);
  }

  // validate the auth/oauth token
  public validateAuthTokenRoute = async (req: Request, res: Response, next: NextFunction) => {
    const {
      authToken = ''
    } = req.body
    console.log('authToken :>> ', authToken);
    const response = await http.get(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    const profile = response?.data || {}
    const user = await new UserCreateUsecase().execute({
      firstName: profile.given_name || '',
      lastName: profile.family_name || '',
      email: profile.email || '',
      displayName: profile.name,
      // profileImageUrl: _json.picture, // can be enable later, not sure if really needed.
      oauth: {
        sub: profile.id,
        provider: USER_OAUTH_PROVIDER.GOOGLE,
        json: profile
      }
      // but should also add the details of oauth
    });
    const accessToken = jwt.sign({
      sub: user._id,
      // jti: user.id,
    }, jwtSecretKey, {
      expiresIn: (((60 * 60) * 24) * 30) * 1000 // 30 days
    })
  //   {x
  //     "id": "105078337166328545737",
  //     "email": "lalekidman@gmail.com",
  //     "verified_email": true,
  //     "name": "Darryl Fabian",
  //     "given_name": "Darryl",
  //     "family_name": "Fabian",
  //     "picture": "https://lh3.googleusercontent.com/a/AGNmyxZfb_i3KBL-IxV8qgA7LT8a-oWYu4kyKJ6Szy95wA=s96-c",
  //     "locale": "en-US"
  // }
    res
      .status(HttpStatus.OK)
      .send({
        data: user,
        accessToken // token
      });
  }
}