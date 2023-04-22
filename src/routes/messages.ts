import {Router} from 'express'
import {Request, Response, NextFunction} from 'express'
import {
  MessageController
} from '@app/controllers/message.controller'
export class MessagesRoute {
  /**
   * expose the routes
   */
  public expose () {
    const appRoute = Router({
      mergeParams: true
    })
    const appController = new MessageController()

    appRoute.post('/',
      appController.createRoute
    )
    appRoute.get('/',
      appController.listRoute
    )
    appRoute.patch('/:id/remove',
      appController.removeRoute
    )
    
    return appRoute
  }
}