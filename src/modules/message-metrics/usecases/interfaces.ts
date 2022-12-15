import {
  IGeneralUsecaseDependencies,
} from '@app/common/interfaces'
import {
  IMessageMetricsRepositoryGateway
} from '../repository-gateway.interfaces'

export interface IMessageMetricsUsecaseDependencies extends IGeneralUsecaseDependencies<IMessageMetricsRepositoryGateway> {
}
