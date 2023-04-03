
import { IQRCodeUsecaseDependencies } from './interfaces'

export const makeQRCodeViewDetailsUsecase = (
  {
    repositoryGateway
  }: IQRCodeUsecaseDependencies
) => {
  return class QRCodeViewDetailsUsecase {
    constructor() {}
    
    /**
     * get details by id
     * @param data 
     * @returns 
     */
    public async getOneById (id: string) {
      return repositoryGateway.list({
        _id: id
      })
    }
  }
}
