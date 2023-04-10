import {
  MessageRepositoryGateway
} from '@app/persistent/repository/messages'

import {
  makeMessageCreateUsecase
} from './create'
import {
  makeMessageUpdateUsecase
} from './update'

const repositoryGateway = new MessageRepositoryGateway()

export const MessageCreateUsecase = makeMessageCreateUsecase({
  repositoryGateway,
})

export const MessageUpdateUsecase = makeMessageUpdateUsecase({
  repositoryGateway
})

// export const ChatRoomViewDetailsUsecase = makeChatRoomViewDetailsUsecase({
//   repositoryGateway
// })
