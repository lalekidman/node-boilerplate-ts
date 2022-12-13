import {
  IsString,
  IsBoolean,
  IsNumeric
} from "@app/common/decorators";
import {
  IGeneralEntityDependencies
} from "@app/common/interfaces";
import { MESSAGE_METRICS_OPERATION } from "../enums";
import {
  IMessageMetricsEntity
} from './interfaces'

export const makeMessageMetricsEntity = ({
  generateId
}: IGeneralEntityDependencies) => {
  class MessageMetricsEntity implements IMessageMetricsEntity {
    readonly _id: string;

    private _count: number = 0;
    private _communityId: string = '';
    private _operation: string = MESSAGE_METRICS_OPERATION.WRITE;
    private _channelId: string = '';

    readonly createdAt: number = Date.now();
    readonly updatedAt: number = Date.now();

    constructor(data: Partial < IMessageMetricsEntity > ) {
      const {
        _id = generateId(),

        communityId = this._communityId,
        channelId = this._channelId,
        operation = this._operation,
        count = this._count,

        createdAt = this.createdAt,
        updatedAt = this.updatedAt,
      } = data

      this._id = _id

      this.communityId = communityId
      this.channelId = channelId
      this.operation = operation
      this.count = count

      this.createdAt = createdAt
      this.updatedAt = updatedAt
    }


    /**
     * Getter communityId
     * @return {string }
     */
    public get communityId(): string {
      return this._communityId;
    }

    /**
     * Setter communityId
     * @param {string } value
     */
    @IsString({
      required: true
    })
    public set communityId(value: string) {
      this._communityId = value;
    }


    /**
     * Getter channelId
     * @return {string }
     */
    public get channelId(): string {
      return this._channelId;
    }

    /**
     * Setter channelId
     * @param {string } value
     */
    @IsString({
      required: true
    })
    public set channelId(value: string) {
      this._channelId = value;
    }

    /**
     * Getter operation
     * @return {string }
     */
    public get operation(): string {
      return this._operation;
    }

    /**
     * Setter operation
     * @param {string } value
     */
    @IsString({
      required: true
    })
    public set operation(value: string) {
      this._operation = value;
    }

    /**
     * Getter count
     * @return {number }
     */
    public get count(): number  {
      return this._count;
    }

    /**
     * Setter count
     * @param {number } value
     */
    public set count(value: number ) {
      this._count = value;
    }

  }
  return MessageMetricsEntity
}