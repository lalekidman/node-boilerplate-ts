import GeneralGatewayService from "@app/common/gateway/repository/repository-gateway.service"
import {
  IChatRoomCollectionModel,
  ChatRoomCollectionModel
} from './schema'

import {
  IChatRoomEntity,
  IChatRoomRepositoryGateway
} from '@app/domain/chat-room'

export class ChatRoomRepositoryGateway extends GeneralGatewayService<IChatRoomCollectionModel, IChatRoomEntity> implements IChatRoomRepositoryGateway {
  constructor () {
    super(ChatRoomCollectionModel)
  }
}
