
import {
  UserEntity,
  IUserInput
} from '../entity'

import { IUserUsecaseDependencies } from './interfaces'

export const makeUserCreateUsecase = (
  {
    repositoryGateway
  }: IUserUsecaseDependencies
) => {
  return class UserCreateUsecase {
    constructor() {}
    /**
     * 
     * @param data 
     * @returns 
     */
    public async execute(
      data: IUserInput,
    ) {
      const {oauth, ..._data} = data
      const userEntity = new UserEntity(_data)
      // get by email, username, or oauth provider.
      let user = await repositoryGateway.findOne({
        $or: [
          {
            email: userEntity.email,
          },
          {
            username: userEntity.username,
          },
          ...(data.oauth ? [{oauth: {$elemMatch: {provider: data.oauth.provider, sub: data.oauth.sub}}}] : [])
        ]
      })
      if (!user) {
        user = await repositoryGateway.insertOne(userEntity.toObject())
      } else {
        if (oauth) {
          [...user.oauth, oauth].forEach((oauthProvider) => userEntity.addOAuth(oauthProvider))
          await repositoryGateway.updateOne({
            _id: user._id
          }, {
            // just update the oauth.
            oauth: userEntity.oauth
          })
        }
      }
      return userEntity.toObject()
    }
  }
}
