import { IChatRoomUsecaseDependencies } from './interfaces'
import {
  IChatRoomEntity
} from '../entity/interfaces'

interface IGetOneByAuthorAndQRIdOption extends Pick<IChatRoomEntity,
 | 'qrCodeId'
 | 'authorId'
> {
}

interface IGetOneByAuthorAndOwnerIdOption {
  ownerId: string
  authorId: string
}
export const makeChatRoomViewDetailsUsecase = (
  {
    repositoryGateway
  }: IChatRoomUsecaseDependencies
) => {
  return class ChatRoomViewDetailsUsecase {
    constructor() {}
    /**
     * get one ChatRoom
     * @param id 
     * @returns 
     */
    public async getOne(
      id: string
    ) {
      return repositoryGateway.findOne({
        _id: id
      })
    }
    /**
     * get one ChatRoom
     * throw error of no ChatRoom data found.
     * @param id 
     * @returns 
     */
    public async getOneStrict(
      id: string
    ) {
      const chatroom = await this.getOne(id)
      if (!chatroom) {
        throw new Error("No chatroom data found.")
      }
      return chatroom
    }
    /**
     * get one ChatRoom
     * throw error of no ChatRoom data found.
     * @param id 
     * @returns 
     */
    public async getOneByAuthorAndOwnerId(
      {
        authorId,
        ownerId
      }: IGetOneByAuthorAndOwnerIdOption
    ) {
      const chatroom = await repositoryGateway.findOne({
        $or: [
          {
            ownerId,
            authorId,
          },
          {
            ownerId: authorId,
            authorId: ownerId,
          }
        ]
      })
      return chatroom
    }
    /**
     * 
     * @param option 
     * @returns 
     */
    public async getOneByAuthorAndOwnerIdStrict(
      option: IGetOneByAuthorAndOwnerIdOption
    ) {
      const chatroom = await this.getOneByAuthorAndOwnerId(option)
      if (!chatroom) {
        throw new Error("No chatroom data found.")
      }
      return chatroom
    }

    /**
     * get chat room by author and qr
     * @param id 
     * @returns 
     */
    public async IGetOneByAuthorIdAndQRIdOption (
      {
        authorId,
        qrCodeId,
      }: IGetOneByAuthorAndQRIdOption
    ) {
      return repositoryGateway.findOne({
        authorId,
        qrCodeId
      })
    }
  }
}
