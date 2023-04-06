import {v4 as uuid} from 'uuid'
import {
  makeUserEntity
} from './entity'
import {
  transformToSlug
} from '@app/common/helper'

export const UserEntity = makeUserEntity({
  generateId: uuid,
  generateSlug: transformToSlug
})

export * from './interfaces'