
import {
  MessageEntity,
  IMessageInput,
} from '../entity'

import { IMessageUsecaseDependencies } from './interfaces'

export const makeMessageRemoveUsecase = (
  {
    repositoryGateway,
  }: IMessageUsecaseDependencies
) => {
  return class ChatRoomRemoveUsecase {
    constructor() {}
    /**
     * 
     * @param id 
     * @param data 
     * @returns 
     */
    public async removeOne (
      roomId: string,
      id: string,
      data: Pick<IMessageInput, 'authorId'> & {
        remarks: string|null
      }
    ) {
      const {
        authorId,
        remarks = null
      } = data
      const entity = new MessageEntity({_id: id})
      entity.markAsDelete(authorId, remarks)

      await repositoryGateway.updateOne({
        _id: entity._id,
        roomId,
      }, {
        deleted: entity.deleted
      })
      return entity.toObject()
    }
  }
}
