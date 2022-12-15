import {
  IGeneralEntityProperties
} from '@app/common/interfaces'

export interface IMessageMetricsBody {
  count: number
  communityId: string
  operation: string // read, write?
  channelId: string
}

export interface IMessageMetricsEntity extends IGeneralEntityProperties, IMessageMetricsBody {
}
