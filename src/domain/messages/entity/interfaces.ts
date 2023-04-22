import {
  IGeneralEntityProperties, IGeneralStatusEntityProperties
} from '@app/common/interfaces'

export interface IMessageDeleted extends IGeneralStatusEntityProperties {
  remarks: string|null
}
export interface IMessageMember {
  userId: string
  authorId: string // user who add the user member
  joinedAt: number
}
export interface IMessageEntity extends IGeneralEntityProperties {
  text: string
  edited: boolean

  authorId: string
  parentId: string|null // not sure
  roomId: string

  deleted: IMessageDeleted
}

export interface IMessageInput extends Pick<IMessageEntity,
| 'text'
| 'authorId'
>, Partial<Pick<IMessageEntity,
| 'parentId'
>> {
}