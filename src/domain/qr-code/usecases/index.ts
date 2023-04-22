import {
  QRCodeRepositoryGateway
} from '@app/persistent/repository/qr-codes'

import {
  makeQRCodeCreateUsecase
} from './create'
import {
  makeQRCodeListUsecase
} from './list'
// import {
//   makeQRCodeCreateUsecase
// } from './update'
import {
  makeQRCodeViewDetailsUsecase
} from './view-details'

const repositoryGateway = new QRCodeRepositoryGateway()

export const QRCodeCreateUsecase = makeQRCodeCreateUsecase({
  repositoryGateway,
})

export const QRCodeListUsecase = makeQRCodeListUsecase({
  repositoryGateway,
})

export const QRCodeViewDetailsUsecase = makeQRCodeViewDetailsUsecase({
  repositoryGateway,
})
