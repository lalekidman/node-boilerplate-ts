import {
  ChatRoomRepositoryGateway
} from '@app/persistent/repository/chat-room'

import {
  makeChatRoomCreateUsecase
} from './create'
// import {
//   makeUserUpdateUsecase
// } from './update'
import {
  makeChatRoomViewDetailsUsecase
} from './view-details'
import {
  UserViewDetailsUsecase
} from '@app/domain/user/usecases'

const repositoryGateway = new ChatRoomRepositoryGateway()

export const ChatRoomCreateUsecase = makeChatRoomCreateUsecase({
  repositoryGateway,
  getUserDetails: new UserViewDetailsUsecase().getOne
})

// export const UserUpdateUsecase = makeUserUpdateUsecase({
//   repositoryGateway
// })

export const ChatRoomViewDetailsUsecase = makeChatRoomViewDetailsUsecase({
  repositoryGateway
})
