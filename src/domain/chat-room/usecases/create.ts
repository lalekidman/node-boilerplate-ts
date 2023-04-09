
import {
  ChatRoomEntity,
  IChatRoomInput
} from '../entity'

import { IChatRoomUsecaseDependencies } from './interfaces'

export const makeChatRoomCreateUsecase = (
  {
    repositoryGateway
  }: IChatRoomUsecaseDependencies
) => {
  return class ChatRoomCreateUsecase {
    constructor() {}
    /**
     * 
     * @param data 
     * @returns 
     */
    public async execute(
      data: IChatRoomInput,
      userId: string
    ) {
      const {
        imageUrl,
        members,
        name,
      } = data
      const entity = new ChatRoomEntity({
        name,
        members,
        imageUrl,
        authorId: userId
      })
      await repositoryGateway.insertOne(entity.toObject())
      return entity.toObject()
    }
  }
}
