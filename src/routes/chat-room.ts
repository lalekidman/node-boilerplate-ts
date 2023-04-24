import {Router} from 'express'
import {ChatRoomController} from '@app/controllers/chat-room.controller'
export class ChatRoomRoute {
  /**
   * expose the routes
   */
  public expose () {
    const appRoute = Router({
      mergeParams: true
    })
    const appController = new ChatRoomController()
    appRoute.post('/',
      appController.addRoute
    )
    appRoute.get('/',
      appController.listRoute
    )
    appRoute.get('/:id',
      appController.detailsRoute
    )
    // appRoute.post('/',
    //   appController.createRoute
    // )
    return appRoute
  }
}