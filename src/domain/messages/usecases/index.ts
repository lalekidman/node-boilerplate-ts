import {
  MessageRepositoryGateway
} from '@app/persistent/repository/messages'

import {
  makeMessageCreateUsecase
} from './create'
import {
  makeMessageUpdateUsecase
} from './update'
import {
  makeMessageRemoveUsecase
} from './remove'
import {
  makeMessageListUsecase
} from './list'

const repositoryGateway = new MessageRepositoryGateway()

export const MessageCreateUsecase = makeMessageCreateUsecase({
  repositoryGateway,
})

export const MessageUpdateUsecase = makeMessageUpdateUsecase({
  repositoryGateway
})

export const MessageListUsecase = makeMessageListUsecase({
  repositoryGateway
})
export const MessageRemoveUsecase = makeMessageRemoveUsecase({
  repositoryGateway
})

// export const ChatRoomViewDetailsUsecase = makeChatRoomViewDetailsUsecase({
//   repositoryGateway
// })
