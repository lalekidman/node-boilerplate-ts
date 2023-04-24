
import { IUserEntity } from '@app/domain/user'
import {
  ChatRoomEntity,
  IChatRoomInput
} from '../entity'

import { IChatRoomUsecaseDependencies } from './interfaces'
interface IChatRoomCreateUsecaseDependencies extends IChatRoomUsecaseDependencies {
  getUserDetails: (id: string) => Promise<IUserEntity>
  getRoomDetails: (authorId: string, qrCodeId: string) => Promise<IChatRoomInput|null>
}
export const makeChatRoomCreateUsecase = (
  {
    repositoryGateway,
    getRoomDetails,
    getUserDetails
  }: IChatRoomCreateUsecaseDependencies
) => {
  return class ChatRoomCreateUsecase {
    constructor() {}
    /**
     * 
     * @param data 
     * @returns 
     */
    public async execute(
      data: IChatRoomInput
    ) {
      const {
        imageUrl,
        members,
        name,
        authorId,
        ownerId,
        qrCodeId
      } = data
      const entity = new ChatRoomEntity({
        name,
        members,
        imageUrl,
        authorId,
        ownerId,
        qrCodeId,
      })
      if (!entity.name) {
        // use the user display name as a default value of `name` is not provided.
        entity.name = (await getUserDetails(entity.ownerId)).displayName
      }
      if (await getRoomDetails(entity.authorId, entity.qrCodeId)) {
        // throw already exists.
        throw new Error("Room is already exists for this qr code.")
      }
      // save to repository
      await repositoryGateway.insertOne(entity.toObject())
      return entity.toObject()
    }
  }
}
