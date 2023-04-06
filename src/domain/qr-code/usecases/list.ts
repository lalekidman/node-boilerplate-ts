
import {
  IQRCodeEntityInput,
  QRCodeEntity
} from '../entity'

import { IQRCodeUsecaseDependencies } from './interfaces'

interface IQRCodeListOption {
  ownerId: string
}
export const makeQRCodeListUsecase = (
  {
    repositoryGateway
  }: IQRCodeUsecaseDependencies
) => {
  return class QRCodeListUsecase {
    constructor() {}
    
    /**
     * 
     * @param option 
     * @returns 
     */
    public async getList (
      option: IQRCodeListOption
    ) {
      const {
        ownerId
      } = option

      // const list = await repositoryGateway.list({
      //   ownerId
      // })
      // return list
    }
  }
}
