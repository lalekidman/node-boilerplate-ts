import {
  MessageMetricsRepositoryGateway
} from 'persistent/repository/message-metrics'

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

