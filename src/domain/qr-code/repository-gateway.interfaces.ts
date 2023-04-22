import {
  IGeneralRepositoryGateway,
} from '@app/common/gateway/repository/repository-gateway.interfaces'

import {
  IQRCodeEntity,
} from './entity'

export interface IQRCodeRepositoryGateway extends IGeneralRepositoryGateway < IQRCodeEntity > {
}
