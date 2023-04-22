
import { IMessageUsecaseDependencies } from './interfaces'

interface IMessageListOption {
  roomId: string
}
export const makeMessageListUsecase = (
  {
    repositoryGateway
  }: IMessageUsecaseDependencies
) => {
  return class MessageListUsecase {
    constructor() {}
    /**
     * 
     * @param option 
     * @returns 
     */
    public async getList (
      option: IMessageListOption
    ) {
      const {
        roomId
      } = option

      const list = await repositoryGateway.list({
        roomId,
        'deleted.status': false
      })
      return list
    }
  }
}
