import {Request, Response, NextFunction, Router} from 'express'
import httpStatus, * as HttpStatus from 'http-status'
import {ErrorCodes, HttpErrorResponse, SuccessResponse} from '@app/common/http-response'
import {
  ChatRoomCreateUsecase,
  ChatRoomViewDetailsUsecase
} from '@app/domain/chat-room/usecases'
export class ChatRoomController {
  
  // public createRoute = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const user = req.user
  //     const chatroom = await new ChatRoomCreateUsecase()
  //       .execute({
  //         ...req.body,
  //         ownerId,
  //         authorId,
  //         members: [
  //           {
  //             authorId: ownerId,
  //             userId: ownerId
  //           }
  //         ]
  //       }, )

  //     res
  //       .status(httpStatus.OK)
  //       .send(chatroom)
  //   } catch (error: any) {
  //     res
  //       .status(httpStatus.BAD_REQUEST)
  //       .send({error: {message: error.message}})
  //   }
  // }
  public listRoute = (req: Request, res: Response, next: NextFunction) => {
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