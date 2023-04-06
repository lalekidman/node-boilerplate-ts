import {
  UserRepositoryGateway
} from '@app/persistent/repository/user'

import {
  makeUserCreateUsecase
} from './create'
import {
  makeUserUpdateUsecase
} from './update'
import {
  makeUserViewDetailsUsecase
} from './view-details'

const repositoryGateway = new UserRepositoryGateway()

export const UserCreateUsecase = makeUserCreateUsecase({
  repositoryGateway
})

export const UserUpdateUsecase = makeUserUpdateUsecase({
  repositoryGateway
})

export const UserViewDetailsUsecase = makeUserViewDetailsUsecase({
  repositoryGateway
})
