import { Request } from 'express'

export interface uploadFiles {
  fieldName: string
  originalFilename: string
  path: string
  headers: object
  type: string
  fileName?: string
  size: number
}
export interface UploadedImage {
  avatarUrl?: string
  fileName?: string
  imageUrl?: string
}
export interface IRequest extends Request {
  files?: any
  payload?: any
  fingerprint?: IFingerprint
  user?: any
}
export interface IFingerprint {
  hash: string
  // components: any
}
export interface IGeneralEntityProperties {
  readonly _id: any
  readonly createdAt: number
  readonly updatedAt: number
}
export interface IGeneralStatusEntityProperties {
  status: boolean
  authorId: string
  createdAt: number
}
export interface IGeneralEntityDependencies {
  generateId: () => string
}
export interface IGeneralUsecaseDependencies<T> {
  repositoryGateway: T
}
export interface RequestToken extends Request {
  accessToken?: string
  authPayload?: any
  payload?: any
  photo?: uploadFiles | uploadFiles[]
  images?: uploadFiles | uploadFiles[]
}

export type IBlobUploader = (fileLocation: string, file: any) => Promise<string>
export interface IBlobS3 {
  upload: (fileLocation: string, file: any) => Promise<string>
  remove: (fileLocation: string) => Promise<any>
}
export interface IPaginationQueryParams {
  limit?: number
  offset?: number
  sort?: string
  fields?: string
  search?: string
}
export interface IEnumExtractor {
  values(enumInput: any): any[]
  keys(enumInput: any): string[]
}

export interface IUrlShortenerOptions {
  metaTags: {
    title: string
    imageURL: string
    desc: string
  }
}
export interface IUrlShortener {
  generate(url: string, options?: IUrlShortenerOptions): Promise<string>
}