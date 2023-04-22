import {
  IGeneralUsecaseDependencies,
} from '@app/common/interfaces'

import {
  IMessageRepositoryGateway
} from '../repository-gateway.interfaces'

export interface IMessageUsecaseDependencies extends IGeneralUsecaseDependencies<IMessageRepositoryGateway> {
}
