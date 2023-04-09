import {Router} from 'express'
import {AuthController} from '@app/controllers/auth.controller'
export class AuthRoute {
  /**
   * expose the routes
   */
  public expose () {
    const appRoute = Router({
      mergeParams: true
    })
    const appController = new AuthController()
    // appRoute.post('/',
    //   appController.addRoute
    // )
    appRoute.get('/',
      appController.detailsRoute
    )
    return appRoute
  }
}