import {
  IGeneralRepositoryGateway,
} from '@app/common/gateway/repository/repository-gateway.interfaces'

import {
  IMessageEntity
} from './entity'

export interface IMessageRepositoryGateway extends IGeneralRepositoryGateway < IMessageEntity > {
}
