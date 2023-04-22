import { COLLECTION_NAMES } from '@app/common/constants'
import {
  SchemaTypeOpts,
  Document,
  Schema,
  model,

} from 'mongoose'

import {
  IQRCodeEntity,
} from '@app/domain/qr-code'

export interface IQRCodeCollectionModel extends IQRCodeEntity, Document {
  _id: string
}

const CollectionModelSchemaObject:Record<keyof IQRCodeEntity, SchemaTypeOpts<any>> = {
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    default: ''
  },
  published: {
    type: Boolean,
    required: true
  },
  publishedAt: {
    type: Number,
    defaul: 0
  },
  suspended: {
    type: Boolean,
    required: true
  },
  suspendedAt: {
    type: Number,
    defaul: 0
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
export const QRCodeCollectionModel = model<IQRCodeCollectionModel>(COLLECTION_NAMES.QR_CODE, CollectionModelSchema)
