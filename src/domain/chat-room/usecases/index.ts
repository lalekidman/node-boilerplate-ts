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
  makeChatRoomListUsecase
} from './list'
import {
  UserViewDetailsUsecase
} from '@app/domain/user/usecases'
const repositoryGateway = new ChatRoomRepositoryGateway()


export const ChatRoomViewDetailsUsecase = makeChatRoomViewDetailsUsecase({
  repositoryGateway
})
export const ChatRoomCreateUsecase = makeChatRoomCreateUsecase({
  repositoryGateway,
  getUserDetails: new UserViewDetailsUsecase().getOne,
  getRoomDetails: (authorId: string, qrCodeId: string) => new ChatRoomViewDetailsUsecase().IGetOneByAuthorIdAndQRIdOption({
    authorId,
    qrCodeId
  })
})
export const ChatRoomListUsecase = makeChatRoomListUsecase({
  repositoryGateway
})
