
import { IUserEntity } from '@app/domain/user'
import {
  ChatRoomEntity,
  IChatRoomInput
} from '../entity'

import { IChatRoomUsecaseDependencies } from './interfaces'
interface IChatRoomCreateUsecaseDependencies extends IChatRoomUsecaseDependencies {
  getUserDetails: (id: string) => Promise<IUserEntity>
}
export const makeChatRoomCreateUsecase = (
  {
    repositoryGateway,
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
        ownerId
      } = data
      const entity = new ChatRoomEntity({
        name,
        members,
        imageUrl,
        authorId,
        ownerId,
      })
      if (!entity.name) {
        // use the user display name as a default value of `name` is not provided.
        entity.name = (await getUserDetails(entity.ownerId)).displayName
      }
      await repositoryGateway.insertOne(entity.toObject())
      return entity.toObject()
    }
  }
}
