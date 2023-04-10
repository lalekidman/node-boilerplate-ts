import passport from 'passport';

import {Router} from 'express'
import {UserRoute} from './user'
import {AuthRoute} from './auth'
import {QRCodeRoute} from './qr-code'

export class AppRoute {
  
  constructor () {
  }
  public authenticate = () => passport.authenticate('jwt', {session: false})
  /**
   * can only be use under docker network.
   * should not be exposed in web server like nginx.
   */
  public privateRoutes () {
    const appRoute = Router({
      mergeParams: true
    })
    appRoute.use("/users", new UserRoute().expose())
    return appRoute
  }
  /**
   * protected routes are the routes that can be only access by authenticated user.
   */
  public protectedRoutes () {
    const appRoute = Router({
      mergeParams: true
    })
    appRoute.use(this.authenticate())
    // appRoute.use("/users", new UserRoute().expose())
    appRoute.use("/qr-codes", new QRCodeRoute().expose())
    appRoute.use("/users", this.authenticate(), new UserRoute().expose())
    return appRoute
  }
  /**
   * public routes are the routes that can be access even the user is not authenticated.
   */
  public publicRoutes () {
    const appRoute = Router({
      mergeParams: true
    })

    appRoute.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
    appRoute.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
      res.redirect('/api/auth');
    });
    // but it will always
    appRoute.use("/auth", new AuthRoute().expose())
    appRoute.use(this.protectedRoutes())
    return appRoute
  }
  /**
   * expose the routes
   */
  public expose () {
    const appRoute = Router({
      mergeParams: true
    })
    appRoute.use("/", this.privateRoutes())
    appRoute.use("/api", this.publicRoutes())
    return appRoute
  }
}