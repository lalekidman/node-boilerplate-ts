import {
  IGeneralEntityProperties
} from '@app/common/interfaces'

export interface IChatRoomMember {
  userId: string
  authorId: string // user who add the user member
  joinedAt: number
}
export interface IChatRoomEntity extends IGeneralEntityProperties {
  name: string // mostly will use in group chat room,
  slug: string
  imageUrl: string // mostly will use in group chat room,
  members: IChatRoomMember[] // participants or members?
  ownerId: string // user who owned the qr
  authorId: string // user who do the scan in the QR.
  qrCodeId: string //
  // author and target?
  // could I add type here? to identity if this thread is a just a peer2peer or p2p or but then, how?
  // I think slug can't help.
  // what would be my identifier to check if the both user already have a chat thread?
}

export interface IChatRoomMemberInput extends Omit<IChatRoomMember, 'joinedAt'>, Partial<Pick<IChatRoomMember, 'joinedAt'>> {
}
export interface IChatRoomInput extends Pick<IChatRoomEntity,
| 'ownerId'
| 'authorId'
| 'qrCodeId'
>, Partial<Pick<IChatRoomEntity,
| 'name'
| 'imageUrl'
>> {
  members: IChatRoomMemberInput[]
}
