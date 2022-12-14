import {
  IMessageMetricsEntity
} from '../entity'
import { MESSAGE_METRICS_OPERATION } from '../enums'

import {
  IMessageMetricsUsecaseDependencies
} from './interfaces'

interface IViewDetailsOption extends Pick<IMessageMetricsEntity,
'communityId' |
'channelId' |
'operation'
> {
  date?: {
    start: Date,
    end: Date
  }
}

export const makeMessageMetricsViewDetailsUsecase = (
  deps: IMessageMetricsUsecaseDependencies
) => {

  return class MessageMetricsViewDetailsUsecase {
    /**
     * 
     * @param data
     * @returns 
     */
    public async getOne (
      options: IViewDetailsOption
    ) {
      const {
        communityId,
        channelId,
        operation = MESSAGE_METRICS_OPERATION.WRITE,
        date = {
          start: new Date(),
          end: new Date(),
        }
      } = options
      const startDate = (new Date(date.start.getFullYear(), date.start.getMonth(), date.start.getDate(), 0, 0, 0)).getTime()
      const endDate = (new Date(date.end.getFullYear(), date.end.getMonth(), date.end.getDate(), 23, 59, 59)).getTime()

      console.log("E: ", startDate)
      console.log("E: ", endDate)

      const node = await deps.repositoryGateway.list({
        communityId,
        channelId,
        operation,
      })
      return node
    }
  }
}