import {
  IGeneralRepositoryGateway,
} from '@app/common/gateway/repository/repository-gateway.interfaces'

import {
  IChatRoomEntity
} from './entity'

export interface IChatRoomRepositoryGateway extends IGeneralRepositoryGateway < IChatRoomEntity > {
}
