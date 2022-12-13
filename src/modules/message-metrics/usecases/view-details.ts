import {
  IMessageMetricsEntity
} from '../entity'
import { MESSAGE_METRICS_OPERATION } from '../enums'

import {
  IMessageMetricsUsecaseDependencies
} from './interfaces'

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
      data: Pick<IMessageMetricsEntity,
        'communityId' |
        'channelId' |
        'operation'
      >
    ) {
      const {
        communityId,
        channelId,
        operation = MESSAGE_METRICS_OPERATION.WRITE
      } = data

      const node = await deps.repositoryGateway.findOne({
        communityId,
        channelId,
        operation,
      })
      return node
    }
  }
}