
import {
  MessageEntity,
  IMessageInput,
} from '../entity'

import { IMessageUsecaseDependencies } from './interfaces'

export const makeMessageCreateUsecase = (
  {
    repositoryGateway,
  }: IMessageUsecaseDependencies
) => {
  return class ChatRoomCreateUsecase {
    constructor() {}
    /**
     * 
     * @param data 
     * @returns 
     */
    public async execute(
      roomId: string,
      data: IMessageInput
    ) {
      const {
        text,
        parentId = null,
        authorId,
      } = data

      const entity = new MessageEntity({
        text,
        parentId,
        authorId,
        roomId,
      })
      // I should sanitized the text.
      await repositoryGateway.insertOne(entity.toObject())
      return entity.toObject()
    }
  }
}
