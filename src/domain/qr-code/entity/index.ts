import {v4 as uuid} from 'uuid'
import {
  makeQRCodeEntity
} from './entity'
import {
  transformToSlug
} from '@app/common/helper'

export const QRCodeEntity = makeQRCodeEntity({
  generateId: uuid,
  generateSlug: transformToSlug
})

export * from './interfaces'