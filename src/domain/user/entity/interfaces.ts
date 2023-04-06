import {
  IGeneralEntityProperties
} from '@app/common/interfaces'
import { USER_OAUTH_PROVIDER } from '../enums'

export interface IUserOAuthProvider {
  provider: USER_OAUTH_PROVIDER
  sub: string
  json: any
  createdAt: number
}

export interface IUserEntity extends IGeneralEntityProperties {
  firstName: string
  lastName: string
  email: string
  displayName: string //
  username: string //user name should be in slug format. 
  profileImageUrl: string
  // profile with different sizes?

  oauth: IUserOAuthProvider[]
  // social_auth? oauthProviders? oauth? I think oauth is enough
  suspended: boolean
  suspendedAt: number // milis
}
export interface IUserInput extends Pick<IUserEntity,
  | 'firstName'
  | 'lastName'
  | 'email'
  >,  Partial<Pick<IUserEntity,
  | 'displayName'
  | 'username'
  | 'profileImageUrl'
  >> {
  oauth?: Omit<IUserOAuthProvider, 'createdAt'>
}