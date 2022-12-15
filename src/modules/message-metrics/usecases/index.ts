import {
  MessageMetricsRepositoryGateway,
  MessageMetricsCollectionModel
} from '../../../persistents/repository/repository'

import {
  makeMessageMetricsSaveUsecase
} from './save'

import {
  makeMessageMetricsViewDetailsUsecase
} from './view-details'

import {
  makeMessageMetricsListUsecase
} from './list'

const repositoryGateway = new MessageMetricsRepositoryGateway(MessageMetricsCollectionModel)

export const MessageMetricsSaveUsecase = makeMessageMetricsSaveUsecase({
  repositoryGateway
})
export const MessageMetricsViewDetailsUsecase = makeMessageMetricsViewDetailsUsecase({
  repositoryGateway
})
export const MessageMetricsListUsecase = makeMessageMetricsListUsecase({
  repositoryGateway
})

