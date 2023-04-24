import { IChatRoomUsecaseDependencies } from './interfaces'

export const makeChatRoomListUsecase = (
  {
    repositoryGateway
  }: IChatRoomUsecaseDependencies
) => {
  return class ChatRoomListUsecase {
    constructor() {
      // ### TODO ###
      // support paginated list in the turue.
    }
    /**
     * get list of the rooms where user is membered.
     * @param userId string: id of the user
     * @returns 
     */
    public async getList(
      userId: string
    ) {
      const chatroom = await repositoryGateway.list({
        "members.userId": userId
      })
      if (!chatroom) {
        throw new Error("No chatroom data found.")
      }
      return chatroom
    }
  }
}
