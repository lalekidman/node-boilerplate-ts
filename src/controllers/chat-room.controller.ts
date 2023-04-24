import {Request, Response, NextFunction, Router} from 'express'
import httpStatus, * as HttpStatus from 'http-status'
import {ErrorCodes, HttpErrorResponse, SuccessResponse} from '@app/common/http-response'
import {
  ChatRoomCreateUsecase,
  ChatRoomViewDetailsUsecase,
  ChatRoomListUsecase,
} from '@app/domain/chat-room/usecases'

import {
  QRCodeViewDetailsUsecase
} from '@app/domain/qr-code/usecases'
export class ChatRoomController {

  public addRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // qr should be required.
      const {qrCodeId = '', name = ''} = req.body
      const currentUserId = req.user._id
      const qrCode = await new QRCodeViewDetailsUsecase().getOneByIdStrict(qrCodeId)
      const chatroom = await new ChatRoomCreateUsecase().execute({
        name,
        ownerId: qrCode.ownerId,
        qrCodeId: qrCode._id,
        authorId: currentUserId,
        members: [
          {
            authorId: currentUserId,
            userId: currentUserId
          },
          {
            authorId: currentUserId,
            userId: qrCode.ownerId
          }
        ]
      })
      res
        .status(httpStatus.OK)
        .send(chatroom)
    } catch (error: any) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({error: {message: error.message}})
    }
  }
  public listRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatroom = await new ChatRoomListUsecase().getList(req.user._id)
      res
        .status(httpStatus.OK)
        .send(chatroom)
    } catch (error: any) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({error: {message: error.message}})
    }
  }
  public detailsRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params
      const chatroom = await new ChatRoomViewDetailsUsecase()
        .getOne(id)

      res
        .status(httpStatus.OK)
        .send(chatroom)
    } catch (error: any) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({error: {message: error.message}})
    }
  }
}