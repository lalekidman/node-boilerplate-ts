import {Router} from 'express'
import {
  MessageRoute
} from './message'
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
    appRoute.use("/messages", new MessageRoute().expose())
    return appRoute
  }
  /**
   * protected routes are the routes that can be only access by authenticated user.
   */
  public protectedRoutes () {
    const appRoute = Router({
      mergeParams: true
    })
    appRoute.use("/messages", new MessageRoute().expose())
    return appRoute
  }
  /**
   * public routes are the routes that can be access even the user is not authenticated.
   */
  public publicRoutes () {
    const appRoute = Router({
      mergeParams: true
    })
    appRoute.use("/messages", new MessageRoute().expose())
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
    // appRoute.use("/api", this.protectedRoutes())
    return appRoute
  }
}