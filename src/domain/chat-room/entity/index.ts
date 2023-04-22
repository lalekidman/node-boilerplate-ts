import {v4 as uuid} from 'uuid'
import {
  makeChatRoomEntity
} from './entity'
import {
  transformToSlug
} from '@app/common/helper'

export const ChatRoomEntity = makeChatRoomEntity({
  generateId: uuid,
  generateSlug: transformToSlug
})

export * from './interfaces'