import {v4 as uuid} from 'uuid'
import {
  makeMessageEntity
} from './entity'

export const MessageEntity = makeMessageEntity({
  generateId: uuid
})

export * from './interfaces'