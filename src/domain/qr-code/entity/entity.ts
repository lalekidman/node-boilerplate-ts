import {
  IsString,
  IsBoolean,
  IsNumeric
} from "@app/common/decorators";
import {
  IGeneralEntityDependencies
} from "@app/common/interfaces";
import {
  IQRCodeEntity
} from './interfaces'

interface IQRCodeEntityDependencies extends IGeneralEntityDependencies {
  generateSlug(name: string): string
}
export const makeQRCodeEntity = ({
  generateId,
  generateSlug
}: IQRCodeEntityDependencies) => {
  class QRCodeEntity implements IQRCodeEntity {
    readonly _id: string;

    private _displayName: string = '';
    private _slug: string = '';
    private _ownerId: string = '';
    private _published: boolean = false;
    private _publishedAt: number = 0;

    private _suspended: boolean = false;
    private _suspendedAt: number = 0;

    readonly createdAt: number = Date.now();
    readonly updatedAt: number = Date.now();

    constructor(data: Partial < Omit<IQRCodeEntity, 'slug'> > ) {
      const {
        _id = generateId(),

        displayName = this._displayName,
        ownerId = this._ownerId,

        published = this._published,
        publishedAt = this._publishedAt,

        suspended = this._suspended,
        suspendedAt = this._suspendedAt,

        createdAt = this.createdAt,
        updatedAt = this.updatedAt,
      } = data

      this._id = _id
      this.displayName = displayName
      this._slug = this.displayName ? generateSlug(this.displayName) : ''

      this.ownerId = ownerId

      this._published = published
      this._publishedAt = publishedAt

      this._suspended = suspended
      this._suspendedAt = suspendedAt

      this.createdAt = createdAt
      this.updatedAt = updatedAt
    }


    /**
     * Getter displayName
     * @return {string }
     */
    public get displayName(): string {
      return this._displayName;
    }

    /**
     * Setter displayName
     * @param {string } value
     */
    public set displayName(value: string) {
      this._displayName = value;
    }


    /**
     * Getter slug
     * @return {string }
     */
    public get slug(): string {
      return this._slug;
    }

    /**
     * Getter ownerId
     * @return {string }
     */
    public get ownerId(): string {
      return this._ownerId;
    }

    /**
     * Setter ownerId
     * @param {string } value
     */
    public set ownerId(value: string) {
      this._ownerId = value;
    }


    /**
     * Getter published
     * @return {boolean }
     */
    public get published(): boolean {
      return this._published;
    }

    public publish () {
      this._published = true
      this._publishedAt = Date.now()
    }

    public unpublish () {
      this._published = true
    }

    /**
     * Getter publishedAt
     * @return {number }
     */
    public get publishedAt(): number {
      return this._publishedAt;
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
    @IsNumeric()
    public get suspendedAt(): number {
      return this._suspendedAt;
    }

    public toObject ():IQRCodeEntity  {
      return {
        _id: this._id,
        displayName: this.displayName,
        slug: this.slug,
        ownerId: this.ownerId,
        published: this.published,
        publishedAt: this.publishedAt,
        suspended: this.suspended,
        suspendedAt: this.suspendedAt,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      }
    }
  }
  return QRCodeEntity
}