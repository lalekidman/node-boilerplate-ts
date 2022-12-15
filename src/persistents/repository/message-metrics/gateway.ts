import { Model } from "mongoose";

import GeneralGatewayService from "@app/common/gateway/repository/gateway.service";

import {
  IMessageMetricsEntity
} from '@app/modules/message-metrics/entity'
import {
  IMessageMetricsRepositoryGateway
} from '@app/modules/message-metrics/repository-gateway.interfaces'

import {
  IMessageMetricsCollectionModel,
} from './schema'


export class MessageMetricsRepositoryGateway extends GeneralGatewayService<IMessageMetricsCollectionModel, IMessageMetricsEntity> implements IMessageMetricsRepositoryGateway {
  constructor (model: Model<IMessageMetricsCollectionModel>) {
    super(model)
  }
}