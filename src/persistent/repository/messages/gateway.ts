import GeneralGatewayService from "@app/common/gateway/repository/repository-gateway.service"
import {
  IMessageCollectionModel,
  MessageCollectionModel
} from './schema'

import {
  IMessageRepositoryGateway,
  IMessageEntity
} from '@app/domain/messages'

export class MessageRepositoryGateway extends GeneralGatewayService<IMessageCollectionModel, IMessageEntity> implements IMessageRepositoryGateway {
  constructor () {
    super(MessageCollectionModel)
  }
}
