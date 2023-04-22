import {Request, Response, NextFunction, Router} from 'express'
import httpStatus from 'http-status'
import {ErrorCodes, HttpErrorResponse, SuccessResponse} from '@app/common/http-response'
import {
  MessageCreateUsecase,
  MessageListUsecase,
  MessageRemoveUsecase
} from '@app/domain/messages/usecases'
export class MessageController {
  
  public createRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user
      const {roomId = ''} = req.params
      const {
        text = '',
        parentId = null
      } = req.body
      const message = await new MessageCreateUsecase().execute(roomId, {
        text,
        authorId: user._id,
        parentId
      })

      res
        .status(httpStatus.CREATED)
        .send(message)
    } catch (error: any) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({error: {message: error.message}})
    }
  }
  public listRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user
      const {roomId = ''} = req.params
      const {
        text = '',
        parentId = null
      } = req.body
      const message = await new MessageListUsecase().getList({
        roomId
      })

      res
        .status(httpStatus.OK)
        .send(message)
    } catch (error: any) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({error: {message: error.message}})
    }
  }

  public removeRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user
      const {roomId = '', id = ''} = req.params
      const {
        remarks = null
      } = req.body

      const message = await new MessageRemoveUsecase().removeOne(roomId, id, {
        authorId: user._id,
        remarks
      })

      res
        .status(httpStatus.OK)
        .send(message)
    } catch (error: any) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({error: {message: error.message}})
    }
  }
}