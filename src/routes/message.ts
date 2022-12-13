import {Router} from 'express'
import MessageController from '@app/controllers/message.controller'
// const multiPartMiddleWare = require('connect-multiparty')()
export class MessageRoute {
  /**
   * expose the routes
   */
  public expose () {
    const appRoute = Router({
      mergeParams: true
    })
    const appController = new MessageController()
    appRoute.post('/',
      appController.addRoute
    )
    return appRoute
  }
}