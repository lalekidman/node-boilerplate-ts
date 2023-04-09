import { IChatRoomUsecaseDependencies } from './interfaces'

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
  }
}
