import {
  IsString,
} from "@app/common/decorators";
import {
  IGeneralEntityDependencies,
  IGeneralStatusEntityProperties
} from "@app/common/interfaces";
import {
  IMessageEntity
} from './interfaces'

export const makeMessageEntity = ({
  generateId
}: IGeneralEntityDependencies) => {
  class MessageEntity implements IMessageEntity {
    readonly _id: string;

    private _text: string = '';
    private _edited: boolean = false;

    private _roomId: string = '';
    private _parentId: string | null = null;
    private _authorId: string = '';

    private _deleted: IGeneralStatusEntityProperties = {
      status: false,
      authorId: '',
      createdAt: 0
    };
    readonly createdAt: number = Date.now();
    readonly updatedAt: number = Date.now();

    constructor(data: Partial < IMessageEntity > ) {
      const {
        _id = generateId(),

          text = this._text,
          edited = this._edited,

          authorId = this._authorId,
          roomId = this._roomId,
          parentId = this._parentId,

          deleted = this._deleted,

          createdAt = this.createdAt,
          updatedAt = this.updatedAt,
      } = data

      this._id = _id
      this.text = text
      this.edited = edited

      this.authorId = authorId
      this.roomId = roomId
      this.parentId = parentId

      this.deleted = deleted

      this.createdAt = createdAt
      this.updatedAt = updatedAt
    }

    /**
     * Getter text
     * @return {string }
     */
    public get text(): string {
      return this._text;
    }

    /**
     * Setter text
     * @param {string } value
     */
    public set text(value: string) {
      this._text = value;
    }

    /**
     * Getter authorId
     * @return {string }
     */
    public get authorId(): string {
      return this._authorId;
    }

    /**
     * Setter authorId
     * @param {string } value
     */
    public set authorId(value: string) {
      this._authorId = value;
    }

    /**
     * Getter edited
     * @return {boolean }
     */
    public get edited(): boolean {
      return this._edited;
    }

    /**
     * Setter edited
     * @param {boolean } value
     */
    public set edited(value: boolean) {
      this._edited = value;
    }

    /**
     * Getter parentId
     * @return {string }
     */
    public get parentId(): string | null {
      return this._parentId;
    }

    /**
     * Setter parentId
     * @param {string } value
     */
    public set parentId(value: string | null) {
      this._parentId = value;
    }

    /**
     * Getter roomId
     * @return {string }
     */
    public get roomId(): string {
      return this._roomId;
    }

    /**
     * Setter roomId
     * @param {string } value
     */
    public set roomId(value: string) {
      this._roomId = value;
    }

    /**
     * Getter deleted
     * @return {IGeneralStatusEntityProperties }
     */
    public get deleted(): IGeneralStatusEntityProperties {
      return this._deleted;
    }

    /**
     * Setter deleted
     * @param {IGeneralStatusEntityProperties } value
     */
    public set deleted(value: IGeneralStatusEntityProperties) {
      this._deleted = value;
    }


    /**
     * get the user object data.
     * @returns 
     */
    public toObject(): IMessageEntity {
      return {
        _id: this._id,
        text: this._text,
        edited: this._edited,
        roomId: this._roomId,
        parentId: this._parentId,
        authorId: this._authorId,
        deleted: this._deleted,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      }
    }
  }
  return MessageEntity
}