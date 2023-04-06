import { COLLECTION_NAMES } from '@app/common/constants'
import {
  SchemaTypeOpts,
  Document,
  Schema,
  model,

} from 'mongoose'

import {
  IUserEntity,
  IUserOAuthProvider
} from 'domain/user'

export interface IUserCollectionModel extends IUserEntity, Document {
  _id: string
}

const OauthModelSchemaObject:Record<keyof IUserOAuthProvider, SchemaTypeOpts<any>> = {
  sub: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  json: {
    type: Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Number,
    defaul: 0
  }
}
const CollectionModelSchemaObject:Record<keyof IUserEntity, SchemaTypeOpts<any>> = {
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
  displayName: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  oauth: {
    type: [new Schema(OauthModelSchemaObject, {_id: false, timestamps: {updatedAt: false, currentTime: Date.now}})],
    defualt: []
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
export const UserCollectionModel = model<IUserCollectionModel>(COLLECTION_NAMES.USERS, CollectionModelSchema)
