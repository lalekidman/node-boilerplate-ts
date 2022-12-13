import {
  MessageMetricsRepositoryGateway
} from '../gateway/repository-gateway'

import {
  makeMessageMetricsSaveUsecase
} from './save'
import {
  makeMessageMetricsViewDetailsUsecase
} from './view-details'

export const MessageMetricsSaveUsecase = makeMessageMetricsSaveUsecase({
  repositoryGateway: new MessageMetricsRepositoryGateway()
})
export const MessageMetricsViewDetailsUsecase = makeMessageMetricsViewDetailsUsecase({
  repositoryGateway: new MessageMetricsRepositoryGateway()
})

