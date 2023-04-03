import {
  IGeneralUsecaseDependencies,
} from '@app/common/interfaces'

import {
  IQRCodeRepositoryGateway
} from '../repository-gateway.interfaces'

export interface IQRCodeUsecaseDependencies extends IGeneralUsecaseDependencies<IQRCodeRepositoryGateway> {
}
