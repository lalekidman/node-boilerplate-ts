import { IRequest} from '../common/interfaces';
import { validationResult } from 'express-validator';
import {Request, Response, NextFunction} from 'express'
import * as HttpStatus from 'http-status'
import {ImagesPattern} from './regex-pattern'
import slugify from 'slugify'
export interface IGeoInfo {
  range: number[]
  counter: string
  region: string
  eu: string
  timezone: string
  city: string
  ll: number[]
  metro: number
  area: number
}
interface IRequestImageParamValidation {
  isRequired: boolean
  fileName: string
}
interface IRequest2 extends IRequest{
  geoInfo: IGeoInfo
  clientIp: string
}
export const ValidateMobileNo = (contactNo: string|number): string|null => {
  const newN = contactNo.toString().replace(/ /g, '').replace(/-/g, '')
  const patt = /^(\+639|09|9)\d{9}$/g
  const txt = newN.toString().match(patt)
  return txt ? txt[0]: null
}
export const ValidateEmail = (email: string): boolean => {
  const pattern = /^\S+@\S+$/
  return pattern.test(email)
}
/**
 *
 * @param searchFields array of fieldName that needed to be search, eg: name, email
 * @param searchText value that needed to be search
 */
export const generateSearchFields = (searchFields: string[], searchText: string) => (searchFields.map((field: string) => ({[field]: {
  $regex: new RegExp(searchText, 'gi')
}})))

export const formValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const result: any = validationResult(req)
  if (result.errors.length !== 0) {
    return res.status(HttpStatus.BAD_REQUEST)
    .json(result)
  }
  next()
}

/**
 * validate request params middleware
 * @param pipeline express validator pipeline such as query | body | params | cookie | header etc...
 * @param imageFileName fileName or array of fileName that needed to be check if image type
 */
export const requestParamsValidatorMiddleware = (pipeline: any[], imageFileName?: string | IRequestImageParamValidation | (IRequestImageParamValidation|string)[]) => {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    await Promise.all(pipeline.map(validation => validation.run(req)));
    const result: any = validationResult(req)
    const validateUploadedImage = (uploadedImage: string | IRequestImageParamValidation) => {
      const _paramName = (typeof(uploadedImage) === 'string') ? uploadedImage : uploadedImage.fileName
      const image = req.files[_paramName]
      const imageURL = req.body[_paramName]
      if (imageURL && (typeof imageURL === 'string' && ImagesPattern.test(imageURL))) {
        // if imageURL is not empty and image format, skip the validation
        return true
      }
      if (!(typeof(uploadedImage) === 'string') && (uploadedImage.isRequired && image?.size <= 0)) {
        result.errors.push({
          value: image,
          msg: `this field is required. ${_paramName}: ${(ImagesPattern).toString()} `,
          param: _paramName,
          location: 'file'
        })
        return false
      }
      if (image && image.size > 0) {
        if (!(image.type.match(ImagesPattern))) {
          result.errors.push({
            value: image,
            msg: `allow file type to upload. ${(ImagesPattern).toString()}`,
            param: _paramName,
            location: 'file'
          })
        }
      }
      return false
    }
    if (imageFileName) {
      if (Array.isArray(imageFileName)) {
        for(const fieldname of imageFileName) {
          validateUploadedImage(fieldname)
        }
      } else {
        validateUploadedImage(imageFileName)
      }
    }
    if (!(result.isEmpty())) {
      return res.status(HttpStatus.BAD_REQUEST)
      .json(result)
    }
    next()
  }
}
/**
 * generate query string for internal request
 * @param queryString
 * @param queryData
 * @param fieldName optional, object properties or index of array
 */
export const generateQueryString = (queryString: string, queryData: any, fieldName?: string) => {
  const x = 0
  for (const query in queryData) {
    const andSign = queryString ? '&' : '?'
    // check if fieldName is not empty, if not, add query inside of the '[]' eg: filterBy[value] = testValue
    const queryField = fieldName ? `${fieldName}[${query}]` : query
    try {
      // console.log('queryData[query]: ', queryData[query])
      // check if the value is object
      if (typeof(queryData[query]) === 'object') {
        // recursion call
        queryString = generateQueryString(queryString, queryData[query], query)
      } else {
        queryString = queryString.concat(andSign).concat(`${queryField}=${queryData[query]}`)
      }
    } catch (err) {
      queryString = queryString.concat(andSign).concat(`${queryField}=${queryData[query]}`)
    }
  }
  return queryString
}

interface IGenerateSlugOption {
  length?: number
  lower?: boolean
}
// transform, convert, generate, 
export function transformToSlug (text: string, option?: IGenerateSlugOption) {
  const {
    length = 50,
    lower = true
  } = option || {}

  const sluggedText = slugify(text, {
    lower,
    remove: /[_,\.]/,
    strict: true,
    trim: true
  })

  let slug = ''

  for (const part of sluggedText.split('-')) {
    // threshold or limit of the slug is 50
    if (slug.length + part.length >= length) {
      break;
    }
    // concat the word in the communityname slug
    slug = slug.concat(`${slug ? '-' : ''}${part}`)
  }
  return slug
}