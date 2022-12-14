import {Router} from 'express'
import {MessageMetricsController} from '@app/controllers/message.controller'
// const multiPartMiddleWare = require('connect-multiparty')()
export class MessageRoute {
  /**
   * expose the routes
   */
  public expose () {
    const appRoute = Router({
      mergeParams: true
    })
    const appController = new MessageMetricsController()
    appRoute.post('/:communityId/:channelId/:operation',
      appController.saveRoute
    )
    appRoute.get('/:communityId/:channelId/:operation',
      appController.listRoute
    )
    // appRoute.get('/:communityId/:channelId/:operation',
    //   appController.viewDetailsRoute
    // )
    return appRoute
  }
}
