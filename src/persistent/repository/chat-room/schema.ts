import { COLLECTION_NAMES } from '@app/common/constants'
import {
  SchemaTypeOpts,
  Document,
  Schema,
  model,

} from 'mongoose'

import {
  IChatRoomEntity,
  IChatRoomMember
} from '@app/domain/chat-room'

export interface IChatRoomCollectionModel extends IChatRoomEntity, Document {
  _id: string
}

const ChatRoomMemberModelSchemaObject:Record<keyof IChatRoomMember, SchemaTypeOpts<any>> = {
  authorId: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    required: true
  },
  joinedAt: {
    type: Number,
    defaul: 0
  }
}
const CollectionModelSchemaObject:Record<keyof IChatRoomEntity, SchemaTypeOpts<any>> = {
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
  imageUrl: {
    type: String,
    default: ''
  },
  authorId: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  members: {
    type: [new Schema(ChatRoomMemberModelSchemaObject, {
      _id: false,
      timestamps: {
        updatedAt: false,
        createdAt: false
      }
    })],
    default: []
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
export const ChatRoomCollectionModel = model<IChatRoomCollectionModel>(COLLECTION_NAMES.CHAT_ROOMS, CollectionModelSchema)
