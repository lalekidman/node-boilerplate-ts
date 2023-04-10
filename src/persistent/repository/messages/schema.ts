import { COLLECTION_NAMES } from '@app/common/constants'
import {
  SchemaTypeOpts,
  Document,
  Schema,
  model,
} from 'mongoose'

import { GeneralStatusPropertyRepositoryObject } from '@app/common/gateway/repository/repository-gateway.service'

import {
  IMessageEntity
} from '@app/domain/messages'

export interface IMessageCollectionModel extends IMessageEntity, Document {
  _id: string
}

const CollectionModelSchemaObject:Record<keyof IMessageEntity, SchemaTypeOpts<any>> = {
  _id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  edited: {
    type: Boolean,
    default: false
  },
  authorId: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
    default: null,
  },
  roomId: {
    type: String,
    required: true
  },
  deleted: GeneralStatusPropertyRepositoryObject,
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
export const MessageCollectionModel = model<IMessageCollectionModel>(COLLECTION_NAMES.MESSAGES, CollectionModelSchema)
