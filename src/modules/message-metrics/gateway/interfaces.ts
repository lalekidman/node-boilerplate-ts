import {
  IGeneralRepositoryGateway,
  // IPaginationQueryParams
} from '@app/common/gateway/repository/gateway.interfaces'

import {
  IMessageMetricsEntity
} from '../entity/interfaces'

// export interface IUserPaginationQuery extends IPaginationQueryParams<IUserEntity> {
// }
export interface IMessageMetricsRepositoryGateway extends IGeneralRepositoryGateway < IMessageMetricsEntity > {
}
