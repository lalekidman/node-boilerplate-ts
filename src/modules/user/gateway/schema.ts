import {
  SchemaTypeOpts,
  Document,
  Schema,
  model
} from 'mongoose'
import { USER_COLLECTION_NAME } from '../constants'
import {
  UserBase
} from '../interfaces'

export interface IUserCollectionModel extends UserBase, Document {
  _id: string
}

const CollectionModelSchemaObject:Record<keyof UserBase, SchemaTypeOpts<any>> = {
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  suspended: {
    type: Boolean,
    default: false
  },
  suspendedAt: {
    type: Number,
    default: 0
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
export const UserCollectionModel = model<IUserCollectionModel>(USER_COLLECTION_NAME, CollectionModelSchema)
