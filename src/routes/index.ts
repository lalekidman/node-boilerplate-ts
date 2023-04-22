import passport from 'passport';

import {
  Router
} from 'express'
import {
  UserRoute
} from './user'
import {
  AuthRoute
} from './auth'
import {
  QRCodeRoute
} from './qr-code'

import {
  MessagesRoute
} from './messages'

export class AppRoute {
  
  constructor () {
  }
  
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
    appRoute.use("/users", new UserRoute().expose())
    appRoute.use("/rooms/:roomId/messages", new MessagesRoute().expose())
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
      res.redirect('/api/users');
    });
    appRoute.use("/users", passport.authenticate('jwt', {session: false}), new UserRoute().expose())
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