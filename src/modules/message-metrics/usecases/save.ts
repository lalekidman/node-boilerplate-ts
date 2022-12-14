import {
  MessageMetricsEntity,
  IMessageMetricsBody
} from '../entity'
import { MESSAGE_METRICS_OPERATION } from '../enums'

import {
  IMessageMetricsUsecaseDependencies
} from './interfaces'

export const makeMessageMetricsSaveUsecase = (
  deps: IMessageMetricsUsecaseDependencies
) => {
  // or should I just return the object?
  return class MessageMetricsSaveUsecase {
    /**
     * 
     * @param data
     * @returns 
     */
    public async execute(
      data: IMessageMetricsBody,
    ) {
      const {
        operation = MESSAGE_METRICS_OPERATION.WRITE
      } = data
      const messageMetricsEntity = new MessageMetricsEntity(data)
      const currentDate = new Date()
      const startDate = (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 0, 0, 0)).getTime()
      const endDate = (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59)).getTime()

      let node = await deps.repositoryGateway.findOne({
        communityId: messageMetricsEntity.communityId,
        channelId: messageMetricsEntity.channelId,
        operation,
        createdAt: {
          $gte: startDate,
          $lte: endDate
        }
      })
      if (!node) {
        node = await deps.repositoryGateway.insertOne({
          _id: messageMetricsEntity._id,
          communityId: messageMetricsEntity.communityId,
          channelId: messageMetricsEntity.channelId,
          operation: messageMetricsEntity.operation,
          count: messageMetricsEntity.count,
    
          createdAt: messageMetricsEntity.createdAt,
          updatedAt: messageMetricsEntity.updatedAt,
        })
      } else {
        const updatedNode = await deps.repositoryGateway.updateOne({
          _id: node._id
        }, {
          count: node.count + messageMetricsEntity.count
        })
        if (updatedNode) {
          node = updatedNode
        }
      }
  
      return node
    }
  }
}