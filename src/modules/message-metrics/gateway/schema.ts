import {
  SchemaTypeOpts,
  Document,
  Schema,
  model
} from 'mongoose'

import { MESSAGE_METRICS_COLLECTION_NAME } from '../constants'

import {
  IMessageMetricsEntity
} from '../entity/interfaces'

export interface IMessageMetricsCollectionModel extends IMessageMetricsEntity, Document {
  _id: string
}

const CollectionModelSchemaObject:Record<keyof IMessageMetricsEntity, SchemaTypeOpts<any>> = {
  _id: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0
  },
  communityId: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    default: null,
  },
  operation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    defaul: 0
  },
  updatedAt: {
    type: Number,
    defaul: 0
  }
}
const CollectionModelSchema = new Schema(CollectionModelSchemaObject)
export const MessageMetricsCollectionModel = model<IMessageMetricsCollectionModel>(MESSAGE_METRICS_COLLECTION_NAME, CollectionModelSchema)
