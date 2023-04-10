
import {
  MessageEntity,
  IMessageInput,
} from '../entity'

import { IMessageUsecaseDependencies } from './interfaces'

export const makeMessageUpdateUsecase = (
  {
    repositoryGateway,
  }: IMessageUsecaseDependencies
) => {
  return class ChatRoomUpdateUsecase {
    constructor() {}
    /**
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    public async updateOne (
      id: string,
      data: Omit<IMessageInput, 'authorId'>
    ) {
      const {
        text,
        parentId = null
      } = data

      const entity = new MessageEntity({
        text,
        edited: true
      })
      // I should sanitized the text.
      await repositoryGateway.updateOne({
        _id: id
      }, {
        text: entity.text,
        edited: entity.edited,
        updatedAt: entity.updatedAt
      })
      return entity.toObject()
    }
  }
}
