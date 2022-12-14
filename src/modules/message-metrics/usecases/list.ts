import {
  IMessageMetricsEntity
} from '../entity'
import { MESSAGE_METRICS_OPERATION } from '../enums'

import {
  IMessageMetricsUsecaseDependencies
} from './interfaces'

interface IListOption extends Pick<IMessageMetricsEntity,
'communityId' |
'channelId' |
'operation'
> {
  date?: {
    start: Date,
    end: Date
  }
}

export const makeMessageMetricsListUsecase = (
  deps: IMessageMetricsUsecaseDependencies
) => {

  return class MessageMetricsListUsecase {
    /**
     * 
     * @param data
     * @returns 
     */
    public async getList (
      options: IListOption
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
      console.log("date: ", date)
      const startDate = (new Date(date.start.getFullYear(), date.start.getMonth(), date.start.getDate(), 0, 0, 0)).getTime()
      const endDate = (new Date(date.end.getFullYear(), date.end.getMonth(), date.end.getDate(), 23, 59, 59)).getTime()

      console.log("startDateE: ", startDate)
      console.log("E:endDate ", endDate)

      const node = await deps.repositoryGateway.list({
        communityId,
        channelId,
        operation,
        createdAt: {
          $gte: startDate,
          $lte: endDate
        }
      }, {
        sort: "createdAt:asc"
      })
      return node
    }
  }
}