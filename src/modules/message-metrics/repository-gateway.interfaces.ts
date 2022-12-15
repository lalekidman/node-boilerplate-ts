import {
  IGeneralRepositoryGateway,
} from '@app/common/gateway/repository/gateway.interfaces'

import {
  IMessageMetricsEntity
} from '@app/modules/message-metrics/entity'
// export interface IUserPaginationQuery extends IPaginationQueryParams<IUserEntity> {
// }
export interface IMessageMetricsRepositoryGateway extends IGeneralRepositoryGateway < IMessageMetricsEntity > {
}
