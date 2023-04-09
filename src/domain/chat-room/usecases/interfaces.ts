import {
  IGeneralUsecaseDependencies,
} from '@app/common/interfaces'

import {
  IChatRoomRepositoryGateway
} from '../repository-gateway.interfaces'

export interface IChatRoomUsecaseDependencies extends IGeneralUsecaseDependencies<IChatRoomRepositoryGateway> {
}
