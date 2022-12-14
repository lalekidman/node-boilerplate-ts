import {
  MessageMetricsRepositoryGateway
} from '../gateway/repository-gateway'

import {
  makeMessageMetricsSaveUsecase
} from './save'
import {
  makeMessageMetricsViewDetailsUsecase
} from './view-details'
import {
  makeMessageMetricsListUsecase
} from './list'

const repositoryGateway = new MessageMetricsRepositoryGateway()

export const MessageMetricsSaveUsecase = makeMessageMetricsSaveUsecase({
  repositoryGateway
})
export const MessageMetricsViewDetailsUsecase = makeMessageMetricsViewDetailsUsecase({
  repositoryGateway
})
export const MessageMetricsListUsecase = makeMessageMetricsListUsecase({
  repositoryGateway
})

