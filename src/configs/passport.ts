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
  UserCreateUsecase
} from '@app/domain/user/usecases'
import { USER_OAUTH_PROVIDER } from '@app/domain';

const jwtSecretKey = process.env.USER_SERVICE_API_SECRET_KEY || '';
(() => {
   let JWTBearerAuthOption = {
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: jwtSecretKey,
     passReqToCallback: true
   };
   
   passport.use(new JWTStrategy(JWTBearerAuthOption, (req: Request, payload: any, done: VerifiedCallback) => {

     let platform = ''
    //  const hasOriginalUri = req.headers['x-original-uri'];
    //  if (!req.headers.client && hasOriginalUri) {
    //    platform = hasOriginalUri.split('/')[3];
    //  }
     const accessToken = req.headers.authorization?.split(' ')[1];
     console.log('accessToken :>> ', accessToken);
     const { hash = '' } = req.fingerprint ? req.fingerprint : {};
     const authOption = {fingerprint: hash, platform}
     done(null, {
      // some data that needed to be in "req.user"
     })
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

passport.serializeUser((user: any, done) => {
  // I think, generation of token should happen here.
  console.log('@serializeUser :>> ', user);
  console.log('@deserializeUser :>> ', user);
  const accessToken = jwt.sign(user, jwtSecretKey, {
    algorithm: 'RS256',
    expiresIn: 60 * 1000 // 1 minute
  })
  console.log('accessToken :>> ', accessToken);
  done(null,  {
    user,
    accessToken
  });
});

passport.deserializeUser((payload: any, done) => {
  console.log('@deserializeUser :>> ', payload);
  done(null, payload)
  // Look up the user by ID and return the user object
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