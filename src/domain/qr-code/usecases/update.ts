
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
  return class QRCodeUpdateUsecase {
    constructor() {}
    
    /**
     * update qr details
     * @param data 
     * @returns 
     */
    public async update (
      id: string,
      dataInput: Partial<Omit<IQRCodeEntityInput, 'ownerId'>>
    ) {
  
      const qrCode = await repositoryGateway.findOne({_id: id})
      if (qrCode) {
        const entity = new QRCodeEntity(dataInput)
        await repositoryGateway.updateOne({
          _id: id,
        }, {
          ...(entity.name ? {name: entity.name, slug: entity.slug} : {}),
        })
        return entity.toObject()
      }
      return null
    }
    /**
     * update publish status
     * @param data 
     * @returns 
     */
    public async updatePublishStatus(
      id: string,
      status: boolean
    ) {
  
      const qrCode = await repositoryGateway.findOne({_id: id})
      if (qrCode) {
        const entity = new QRCodeEntity(qrCode)
        if (status) {
          entity.publish()
        } else {
          entity.unpublish()
        }
        await repositoryGateway.updateOne({
          _id: id,
        }, {
          published: entity.published,
          publishedAt: entity.publishedAt
        })

        return entity.toObject()
      }
      return null
    }
    /**
     * update suspend status
     * @param data 
     * @returns 
     */
    public async updateSuspendStatus(
      id: string,
      status: boolean
    ) {
  
      const qrCode = await repositoryGateway.findOne({_id: id})
      if (qrCode) {
        const entity = new QRCodeEntity(qrCode)
        if (status) {
          entity.suspend()
        } else {
          entity.unsuspend()
        }
        await repositoryGateway.updateOne({
          _id: id,
        }, {
          suspended: entity.suspended,
          suspendedAt: entity.suspendedAt
        })

        return entity.toObject()
      }
      return null
    }
  }
}
