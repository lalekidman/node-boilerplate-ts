import {
  UserRepositoryGateway
} from '@app/persistent/repository/user'

import {
  makeUserCreateUsecase
} from './create'

const repositoryGateway = new UserRepositoryGateway()

export const UserCreateUsecase = makeUserCreateUsecase({
  repositoryGateway
})
