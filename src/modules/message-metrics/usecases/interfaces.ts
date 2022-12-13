import {
  IGeneralUsecaseDependencies,
} from '@app/common/interfaces'
import {
  IMessageMetricsRepositoryGateway
} from '../gateway/interfaces'

export interface IMessageMetricsUsecaseDependencies extends IGeneralUsecaseDependencies<IMessageMetricsRepositoryGateway> {
}