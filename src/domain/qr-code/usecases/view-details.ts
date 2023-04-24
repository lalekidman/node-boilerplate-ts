
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
      return repositoryGateway.findOne({
        _id: id
      })
    }
    /**
     * get qr code data by id
     * throw error if no data found.
     * @param data 
     * @returns 
     */
    public async getOneByIdStrict (id: string) {
      const node = await this.getOneById(id)
      if (!node) {
        throw new Error("No qr code data found.")
      }
      return node
    }
  }
}
