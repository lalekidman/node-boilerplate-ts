/**
 * @libraries
 */
 import { Request } from 'express'
 import passport, {} from 'passport'
 import {Strategy as JWTStrategy, ExtractJwt, VerifiedCallback} from 'passport-jwt'
 import GoogleStrategy from 'passport-google-oauth20';
 import jwt from 'jsonwebtoken'
//  import FacebookStrategy from 'passport-facebook';

import {
  BACKEND_DOMAIN,
  GOOGLE_API_CLIENT_KEY,
  GOOGLE_API_CLIENT_SECRET
} from '@app/common/constants'
import {
  UserCreateUsecase,
  UserViewDetailsUsecase
} from '@app/domain/user/usecases'
import { USER_OAUTH_PROVIDER } from '@app/domain';

const jwtSecretKey = process.env.USER_SERVICE_API_SECRET_KEY || '';
console.log('GOOGLE_API_CLIENT_KEY :>> ', GOOGLE_API_CLIENT_KEY);
console.log('GOOGLE_API_CLIENT_SECRET :>> ', GOOGLE_API_CLIENT_SECRET);
(() => {
   const JWTBearerAuthOption = {
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: jwtSecretKey,
     passReqToCallback: true
   };
   
   passport.use(new JWTStrategy(JWTBearerAuthOption, async (req: Request, payload: any, done: VerifiedCallback) => {
     try {
        let platform = ''
      //  const hasOriginalUri = req.headers['x-original-uri'];
      //  if (!req.headers.client && hasOriginalUri) {
      //    platform = hasOriginalUri.split('/')[3];
      //  }
      const accessToken = req.headers.authorization?.split(' ')[1];
      console.log('accessToken :>> ', accessToken);
      console.log('payload :>> ', payload);
      const { hash = '' } = req.fingerprint ? req.fingerprint : {};
      const authOption = {fingerprint: hash, platform}
      const user = await new UserViewDetailsUsecase()
        .getOneStrict(payload.sub)
      //  aff2e4d6-37c2-454c-8679-66b0cf09075c
      done(null, user)
     } catch (error) {
      done(error)
     }
   }))
 })()

 // Google Auth
passport.use(new GoogleStrategy.Strategy({
  clientID: GOOGLE_API_CLIENT_KEY,
  clientSecret: GOOGLE_API_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, cb) => {
  const {_json} = profile || {}
  const user = await new UserCreateUsecase().execute({
    firstName: _json.given_name || '',
    lastName: _json.family_name || '',
    email: _json.email || '',
    displayName: _json.name,
    // profileImageUrl: _json.picture, // can be enable later, not sure if really needed.
    oauth: {
      sub: profile.id,
      provider: USER_OAUTH_PROVIDER.GOOGLE,
      json: _json
    }
    // but should also add the details of oauth
  })
  console.log('accessToken :>> ', accessToken);
  console.log('refreshToken :>> ', refreshToken);
  console.log('profile :>> ', profile);
  console.log('userx :>> ', user);
  
  // Here you can use the profile information returned
  // by Google to create a new user account or authenticate
  // an existing one.
  return cb(null, user);
}));


passport.deserializeUser((payload: any, done) => {
  console.log('@deserializeUser :>> ', payload);
  done(null, payload)
});


passport.serializeUser((user: any, done) => {
  // I think, generation of token should happen here.
  const accessToken = jwt.sign({
    sub: user._id,
    // jti: user.id,
  }, jwtSecretKey, {
    expiresIn: (((60 * 60) * 24) * 30) * 1000 // 30 days
  })
  done(null,  {
    user,
    accessToken
  });
});


// // Facebook Auth
// passport.use(new FacebookStrategy.Strategy({
//   clientID: 'your-facebook-client-id',
//   clientSecret: 'your-facebook-client-secret',
//   callbackURL: '/auth/facebook/callback'
// }, (accessToken, refreshToken, profile, cb) => {
//   // Here you can use the profile information returned
//   // by Facebook to create a new user account or authenticate
//   // an existing one.
//   return cb(null, profile);
// }));