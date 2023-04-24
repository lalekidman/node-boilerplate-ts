import {
  IsString,
} from "@app/common/decorators";
import {
  IGeneralEntityDependencies
} from "@app/common/interfaces";
import {
  IChatRoomEntity, IChatRoomMember, IChatRoomMemberInput,
} from './interfaces'

interface IChatRoomEntityDependencies extends IGeneralEntityDependencies {
  generateSlug(name: string): string
}
export const makeChatRoomEntity = ({
  generateId,
  generateSlug
}: IChatRoomEntityDependencies) => {
  class ChatRoomEntity implements IChatRoomEntity {
    readonly _id: string;

    private _name: string = '';
    private _slug: string = '';
    private _imageUrl: string = '';
    private _authorId: string = '';
    private _ownerId: string = '';
    private _qrCodeId: string = '';
    private _members: IChatRoomMember[] = [];

    readonly createdAt: number = Date.now();
    readonly updatedAt: number = Date.now();

    constructor(data: Partial < Omit<IChatRoomEntity, 'members'> > & {members: IChatRoomMemberInput[]} ) {
      const {
        _id = generateId(),

        name = this._name,
        slug = this._slug,
        imageUrl = this._imageUrl,
        authorId = this._authorId,
        ownerId = this._ownerId,
        qrCodeId = this._qrCodeId,
        members = this._members,

        createdAt = this.createdAt,
        updatedAt = this.updatedAt,
      } = data

      this._id = _id

      this.name = name
      this.imageUrl = imageUrl
      this.authorId = authorId
      this.ownerId = ownerId
      this.qrCodeId = qrCodeId

      if (!slug && name) {
        this._slug = generateSlug(this.name)
      }

      if (members && members.length >= 1) {
        members.forEach((member) => this.addMember(member))
      }
      this.createdAt = createdAt
      this.updatedAt = updatedAt
    }




    


    /**
     * Getter name
     * @return {string }
     */
	public get name(): string  {
		return this._name;
	}

  /**
   * Setter name
   * @param {string } value
   */
  @IsString({
    required: true,
    minLength: 1,
    maxLength: 32
  })
	public set name(value: string ) {
		this._name = value;
    this._slug = generateSlug(this._name)
	}


    /**
     * Getter slug
     * @return {string }
     */
	public get slug(): string  {
		return this._slug;
	}

    /**
     * Getter imageUrl
     * @return {string }
     */
	public get imageUrl(): string  {
		return this._imageUrl;
	}

    /**
     * Setter imageUrl
     * @param {string } value
     */
	public set imageUrl(value: string ) {
		this._imageUrl = value;
	}
    /**
     * Getter authorId
     * @return {string }
     */
	public get authorId(): string  {
		return this._authorId;
	}

    /**
     * Setter authorId
     * @param {string } value
     */
	public set authorId(value: string ) {
		this._authorId = value;
	}
    /**
     * Getter ownerId
     * @return {string }
     */
	public get ownerId(): string  {
		return this._ownerId;
	}

    /**
     * Setter ownerId
     * @param {string } value
     */
	public set ownerId(value: string ) {
		this._ownerId = value;
	}

  /**
   * Getter qrCodeId
   * @return {string }
   */
	public get qrCodeId(): string  {
		return this._qrCodeId;
	}

  /**
   * Setter qrCodeId
   * @param {string } value
   */
	public set qrCodeId(value: string ) {
		this._qrCodeId = value;
	}
  

    /** 
     * Getter members
     * @return {IChatRoomMember[] }
     */
	public get members(): IChatRoomMember[]  {
		return this._members;
	}

  public addMember (member: IChatRoomMemberInput) {
    this._members.push({
      authorId: member.authorId,
      userId: member.userId,
      ...( !(member.joinedAt && member.joinedAt >= 1) ? {joinedAt: Date.now()} : {joinedAt: member.joinedAt})
    })
  }

    /**
     * get the user object data.
     * @returns 
     */
    public toObject (): IChatRoomEntity {
      return {
        _id: this._id,
        name: this._name,
        slug: this._slug,
        imageUrl: this._imageUrl,
        authorId: this._authorId,
        ownerId: this._ownerId,
        members: this._members,
        qrCodeId: this._qrCodeId,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      }
    }
  }
  return ChatRoomEntity
}