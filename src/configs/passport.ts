/**
 * @libraries
 */
 import { Request } from 'express'
 import passport, {} from 'passport'
 import {Strategy as JWTStrategy, ExtractJwt, VerifiedCallback} from 'passport-jwt'
 import GoogleStrategy from 'passport-google-oauth20';
//  import FacebookStrategy from 'passport-facebook';

import {
  BACKEND_DOMAIN,
  GOOGLE_API_CLIENT_KEY,
  GOOGLE_API_CLIENT_SECRET
} from '@app/common/constants'
import {
  UserCreateUsecase
} from '@app/domain/user/usecases'
 export default () => {
   let JWTBearerAuthOption = {
     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
     secretOrKey: process.env.ACCOUNT_SERVICE_ACCESS_KEY_SECRET_ID,
     passReqToCallback: true
   };
   
   passport.use(new JWTStrategy(JWTBearerAuthOption, (req: Request, payload: any, done: VerifiedCallback) => {

     let platform = ''
    //  const hasOriginalUri = req.headers['x-original-uri'];
    //  if (!req.headers.client && hasOriginalUri) {
    //    platform = hasOriginalUri.split('/')[3];
    //  }
    //  const accessToken = authorization.split(' ')[1];
     const { hash = '' } = req.fingerprint ? req.fingerprint : {};
     const authOption = {fingerprint: hash, platform}
     done(null, {
      // some data that needed to be in "req.user"
     })
   }))
 }

 // Google Auth
passport.use(new GoogleStrategy.Strategy({
  clientID: GOOGLE_API_CLIENT_KEY,
  clientSecret: GOOGLE_API_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, cb) => {
  const {_json} = profile || {}
  const user = await new UserCreateUsecase().execute({
    firstName: _json.given_name || '',
    lastName: _json.family_name || '',
    email: _json.email || '',
    displayName: _json.name,
    // but should also add the details of oauth
  })
  console.log('accessToken :>> ', accessToken);
  console.log('refreshToken :>> ', refreshToken);
  console.log('profile :>> ', profile);
  // Here you can use the profile information returned
  // by Google to create a new user account or authenticate
  // an existing one.
  console.log('user :>> ', user);
  return cb(null, user);
}));

passport.serializeUser((user: any, done) => {
  console.log('user @ serialized user :>> ', user);
  done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log('id :>> ', id);
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