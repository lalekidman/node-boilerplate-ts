import GeneralGatewayService from "@app/common/gateway/repository/gateway.service";
import {
  IMessageMetricsCollectionModel,
  MessageMetricsCollectionModel
} from './schema'
import {
  IMessageMetricsRepositoryGateway
} from './interfaces'

import {
  IMessageMetricsEntity
} from '../entity/interfaces'

export class MessageMetricsRepositoryGateway extends GeneralGatewayService<IMessageMetricsCollectionModel, IMessageMetricsEntity> implements IMessageMetricsRepositoryGateway {
  constructor () {
    super(MessageMetricsCollectionModel)
  }
}
