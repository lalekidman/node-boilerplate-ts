
import {
  IQRCodeEntityInput,
  QRCodeEntity
} from '../entity'

import { IQRCodeUsecaseDependencies } from './interfaces'

export const makeQRCodeCreateUsecase = (
  {
    repositoryGateway
  }: IQRCodeUsecaseDependencies
) => {
  return class QRCodeCreateUsecase {
    constructor() {}
    
    /**
     * 
     * @param data 
     * @returns 
     */
    public async execute(
      data: IQRCodeEntityInput,
      userId: string,
    ) {
      const entity = new QRCodeEntity(data)
      entity.ownerId = userId
      console.log('entqqqqqqity :>> ', entity.toObject());
      const node = await repositoryGateway.insertOne(entity.toObject())
  
      return node
    }
  }
}
