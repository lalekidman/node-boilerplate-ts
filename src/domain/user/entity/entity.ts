import {
  IsString,
} from "@app/common/decorators";
import {
  IGeneralEntityDependencies
} from "@app/common/interfaces";
import {
  IUserEntity, IUserOAuthProvider
} from './interfaces'

interface IUserEntityDependencies extends IGeneralEntityDependencies {
  generateSlug(name: string): string
}
export const makeUserEntity = ({
  generateId,
  generateSlug
}: IUserEntityDependencies) => {
  class UserEntity implements IUserEntity {
    readonly _id: string;

    private _firstName: string = '';
    private _lastName: string = '';
    private _slug: string = '';

    private _email: string = '';
    private _profileImageUrl: string = '';
    private _displayName: string = '';
    private _username: string = '';

    private _oauth: IUserOAuthProvider[] = [];
    

    private _suspended: boolean = false;
    private _suspendedAt: number = 0;

    readonly createdAt: number = Date.now();
    readonly updatedAt: number = Date.now();

    constructor(data: Partial < IUserEntity > ) {
      const {
        _id = generateId(),

        firstName = this._firstName,
        lastName = this._lastName,

        email = this._email,
        displayName = this._displayName,
        profileImageUrl = this._profileImageUrl,
        oauth = this._oauth,

        suspended = this._suspended,
        suspendedAt = this._suspendedAt,

        createdAt = this.createdAt,
        updatedAt = this.updatedAt,
      } = data

      this._id = _id

      this.firstName = firstName
      this.lastName = lastName
      this.email = email
      this.profileImageUrl = profileImageUrl

      this._displayName = displayName ?? (this.lastName ? `${this.firstName} ${this.lastName}` : this.firstName)
      this._username = generateSlug(this._displayName)

      this._oauth = oauth

      this._suspended = suspended
      this._suspendedAt = suspendedAt


      this.createdAt = createdAt
      this.updatedAt = updatedAt
    }

    /**
     * Getter firstName
     * @return {string }
     */
    public get firstName(): string {
      return this._firstName;
    }

    /**
     * Setter firstName
     * @param {string } value
     */
    @IsString({
      maxLength: 32,
      minLength: 2
    })
    public set firstName(value: string) {
      this._firstName = value;
    }

    /**
     * Getter lastName
     * @return {string }
     */
    public get lastName(): string {
      return this._lastName;
    }

    /**
     * Setter lastName
     * @param {string } value
     */
    @IsString({
      maxLength: 32,
      minLength: 2
    })
    @IsString()
    public set lastName(value: string) {
      this._lastName = value;
    }

    /**
     * Getter email
     * @return {string }
     */
    public get email(): string {
      return this._email;
    }

    /**
     * Setter email
     * @param {string } value
     */
    public set email(value: string) {
      // add some email format validation here.
      this._email = value;
    }

    /**
     * Getter displayName
     * @return {string }
     */
    public get displayName(): string {
      return this._displayName;
    }

    /**
     * Getter profileImageUrl
     * @return {string }
     */
    public get profileImageUrl(): string  {
      return this._profileImageUrl;
    }

      /**
       * Setter profileImageUrl
       * @param {string } value
       */
    public set profileImageUrl(value: string ) {
      this._profileImageUrl = value;
    }

    /**
     * Getter username
     * @return {string }
     */
    public get username(): string {
      return this._username;
    }

    /**
     * Getter slug
     * @return {string }
     */
    public get slug(): string  {
      return this._slug;
    }

    /**
     * Getter oauth
     * @return {IUserOAuthProvider[] }
     */
    public get oauth(): IUserOAuthProvider[]  {
      return this._oauth;
    }



    /**
     * Getter suspended
     * @return {boolean }
     */
    public get suspended(): boolean {
      return this._suspended;
    }
    public suspend () {
      this._suspended = true
      this._suspendedAt = Date.now()
    }
    public unsuspend () {
      this._suspended = false
      // this._suspendedAt = 0 // or just let it?
    }

    /**
     * Getter suspendedAt
     * @return {number }
     */
    public get suspendedAt(): number {
      return this._suspendedAt;
    }

    /**
     * Setter oauth
     * @param {IUserOAuthProvider[] } value
     */
    public addOAuth(value: Omit<IUserOAuthProvider, 'createdAt'>) {
      const index = this._oauth.findIndex((oauth) => oauth.provider === value.provider && oauth.sub === value.sub)
      if (index >= 0) {
        // just update the json value? not sure if really needed.
        this._oauth[index].json = value.json
      } else {
        this._oauth.push({
          ...value,
          createdAt: Date.now()
        })
      }
    }

    public toObject (): IUserEntity {
      return {
        _id: this._id,
        displayName: this._displayName,
        firstName: this._firstName,
        lastName: this._lastName,
        email: this._email,
        username: this._username,
        profileImageUrl: this._profileImageUrl,
        oauth: this._oauth,
        suspended: this._suspended,
        suspendedAt: this._suspendedAt,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      }
    }
  }
  return UserEntity
}