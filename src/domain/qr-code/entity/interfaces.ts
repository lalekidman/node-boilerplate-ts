import {
  IGeneralEntityProperties
} from '@app/common/interfaces'

export interface IQRCodeEntity extends IGeneralEntityProperties {
  displayName: string // or just label
  slug: string
  ownerId: string // owner of the

  published: boolean
  publishedAt: number

  suspended: boolean
  suspendedAt: number
  // status? activated? or status. like pending. should be pprove? nah. I don't think so.
  // maybe the statuses are UNPUBLISH, PUBLISHED, 
  // is QR can be suspended by admins?
}
export interface IQRCodeEntityInput extends Pick<IQRCodeEntity, 'displayName' | 'ownerId'> {
}