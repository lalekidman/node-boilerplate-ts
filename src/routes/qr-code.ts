import {Router} from 'express'
import { QRCodeController } from '@app/controllers/qr-code.controller'
export class QRCodeRoute {
  /**
   * expose the routes
   */
  public expose () {
    const appRoute = Router({
      mergeParams: true
    })
    const appController = new QRCodeController()
    appRoute.post('/',
      appController.createRoute
    )
    appRoute.get('/',
      appController.listRoute
    )
    appRoute.get('/:id',
      appController.detailsRoute
    )
    appRoute.get('/:id/scan',
      appController.scannedRoute
    )
    return appRoute
  }
}