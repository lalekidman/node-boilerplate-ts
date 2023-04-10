import GeneralGatewayService from "@app/common/gateway/repository/repository-gateway.service"
import {
  IQRCodeCollectionModel,
  QRCodeCollectionModel
} from './schema'

import {
  IQRCodeEntity,
  IQRCodeRepositoryGateway
} from '@app/domain/qr-code'

export class QRCodeRepositoryGateway extends GeneralGatewayService<IQRCodeCollectionModel, IQRCodeEntity> implements IQRCodeRepositoryGateway {
  constructor () {
    super(QRCodeCollectionModel)
  }
}
