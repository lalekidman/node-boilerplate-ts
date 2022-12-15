import {v4 as uuid} from 'uuid'
import {
  makeMessageMetricsEntity
} from './entity'

export const MessageMetricsEntity = makeMessageMetricsEntity({
  generateId: uuid
})

export * from './interfaces'