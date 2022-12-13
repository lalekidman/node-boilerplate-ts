import {Request, Response, NextFunction, Router} from 'express'
import * as HttpStatus from 'http-status'
import {ErrorCodes, ErrorResponse, SuccessResponse} from '@app/common/http-response'
import {extractValue} from 'ts-enum-extractor'
import {
  MessageMetricsSaveUsecase,
  MessageMetricsViewDetailsUsecase
} from '@app/modules/message-metrics/usecases'
import { MESSAGE_METRICS_OPERATION } from '@app/modules/message-metrics/enums'

const availableOperation = extractValue(MESSAGE_METRICS_OPERATION)
export default class AppController {
  
  public async validateOperation (operation: string) {
    if (!availableOperation.includes(operation)) {
      // throw error here?
      throw new Error(`Invalid "operation" value. only allowed values are "${availableOperation.join(", ")}"`)
    }
    return true
  }
  public saveRoute = async (req: Request, res: Response, next: NextFunction) => {
    const {
      count = 1
    } = req.body

    const {
      communityId,
      channelId,
      operation
    } = req.params
    // need to validate the operation. allowed values `read`, `write`
      
    try {
      await this.validateOperation(operation)
      
      const node = await new MessageMetricsSaveUsecase().execute({
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
      
    try {
      await this.validateOperation(operation)
      const node = await new MessageMetricsViewDetailsUsecase().getOne({
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
