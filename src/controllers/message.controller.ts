import {Request, Response, NextFunction, Router} from 'express'
import * as HttpStatus from 'http-status'
import {ErrorCodes, ErrorResponse, SuccessResponse} from '@app/common/http-response'

import {
  MessageMetricsSaveUsecase,
  MessageMetricsViewDetailsUsecase
} from '@app/modules/message-metrics/usecases'

export default class AppController {
  
  public addRoute = async (req: Request, res: Response, next: NextFunction) => {
    const {
      communityId,
      channelId,
      operation = 'write',
      count = 1
    } = req.body
    const saveUsecase = new MessageMetricsSaveUsecase()
      
    try {
      const node = await saveUsecase.execute({
        channelId,
        communityId,
        operation,
        count
      })
      res.status(HttpStatus.OK).send(SuccessResponse(node))
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data: null,
        error: error.message,
      })
    }
  }
  public updateRoute = (req: Request, res: Response, next: NextFunction) => {
  }
  public listRoute = (req: Request, res: Response, next: NextFunction) => {
  }
  public viewDetailsRoute = async (req: Request, res: Response, next: NextFunction) => {
    const {
      communityId,
      channelId,
      operation = 'write',
    } = req.params
    const viewDetailsUsecase = new MessageMetricsViewDetailsUsecase()
      
    try {
      const node = await viewDetailsUsecase.getOne({
        channelId,
        communityId,
        operation
      })
      res.status(HttpStatus.OK).send(SuccessResponse(node))
    } catch (error: any) {
      res.status(HttpStatus.BAD_REQUEST).send({
        success: false,
        data: null,
        error: error.message,
      })
    }
  }
}