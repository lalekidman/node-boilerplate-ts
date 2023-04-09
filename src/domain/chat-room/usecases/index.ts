import {
  ChatRoomRepositoryGateway
} from '@app/persistent/repository/chat-room'

import {
  makeChatRoomCreateUsecase
} from './create'
// import {
//   makeUserUpdateUsecase
// } from './update'
// import {
//   makeUserViewDetailsUsecase
// } from './view-details'

const repositoryGateway = new ChatRoomRepositoryGateway()

export const ThreadCreateUsecase = makeChatRoomCreateUsecase({
  repositoryGateway
})

// export const UserUpdateUsecase = makeUserUpdateUsecase({
//   repositoryGateway
// })

// export const UserViewDetailsUsecase = makeUserViewDetailsUsecase({
//   repositoryGateway
// })
