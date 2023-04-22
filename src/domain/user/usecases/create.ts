
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
      // get by email, username, or oauth provider.
      let user = await repositoryGateway.findOne({
        $or: [
          {
            email: data.email,
          },
          {
            username: data.username,
          },
          ...(data.oauth ? [{oauth: {$elemMatch: {provider: data.oauth.provider, sub: data.oauth.sub}}}] : [])
        ]
      })
      const userEntity = new UserEntity({
        ...(user ? {_id: user._id} : {}),
        ..._data,
      })
      if (oauth) {
        userEntity.addOAuth(oauth)
      }
      if (!user) {
        user = await repositoryGateway.insertOne(userEntity.toObject())
      } else {
        if (oauth) {
          user.oauth.forEach((oauthProvider) => userEntity.addOAuth(oauthProvider))
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
