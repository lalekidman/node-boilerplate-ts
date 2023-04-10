import {Request, Response, NextFunction, Router} from 'express'
import httpStatus, * as HttpStatus from 'http-status'
import {ErrorCodes, HttpErrorResponse, SuccessResponse} from '@app/common/http-response'
import {
  QRCodeCreateUsecase,
  QRCodeListUsecase,
  QRCodeViewDetailsUsecase
} from '@app/domain/qr-code/usecases'
import {
  ChatRoomCreateUsecase,
  ChatRoomViewDetailsUsecase
} from '@app/domain/chat-room/usecases'

export class QRCodeController {
  
  public createRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user
      console.log('user :>> ', user);
      const node = await new QRCodeCreateUsecase()
        .execute(req.body, user._id)
      res
        .status(httpStatus.CREATED)
        .send(node)
    } catch (error: any) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({error: {message: error.message}})
    }
  }
  public listRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user
      const node = await new QRCodeListUsecase()
        .getList({
          ownerId: user._id
        })
      res
        .status(httpStatus.OK)
        .send(node)
    } catch (error: any) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({error: {message: error.message}})
    }
  }
  public detailsRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params
      const node = await new QRCodeViewDetailsUsecase()
        .getOneById(id)

      res
        .status(httpStatus.OK)
        .send(node)
    } catch (error: any) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send({error: {message: error.message}})
    }
  }

  public scannedRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {id} = req.params
      const user = req.user
      const node = await new QRCodeViewDetailsUsecase()
        .getOneById(id)
      // when user scan the qr.
      // it will redirect to the chat room page.
      //  - after scanning, chat room should not be created by default, unless user start a conversation or send a message.
      //    - when the user start sending message.
      //      - should check if there's any existing chat room, if not, then create one.
      //       - if yes, then use it.
      
      let chatroom = await new ChatRoomViewDetailsUsecase()
        .getOneByAuthorAndOwnerId({authorId: user._id, ownerId: node.ownerId})
      if (!chatroom) {
        chatroom = await new ChatRoomCreateUsecase().execute({
          authorId: user._id,
          ownerId: node.ownerId,
          members: [
            {
              authorId: user._id,
              userId: node.ownerId
            },
            {
              authorId: user._id,
              userId: user._id
            },
          ]
        })
      }
      
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