import {
  UserRepositoryGateway
} from '@app/persistent/repository/user'

import {
  makeQRCodeCreateUsecase
} from './create'

const repositoryGateway = new UserRepositoryGateway()
// export const QRCodeCreateUsecase = makeQRCodeCreateUsecase({
//   repositoryGateway,
// })
