// import {
//   Document, Model
// } from '../index'
import { Document, Model } from 'mongoose'
import { v4 as uuid } from 'uuid'
import {
  IAggregatePagination,
  IPaginationQueryParams,
} from './gateway.interfaces'

export default abstract class GeneralGatewayService<T extends Document, K> {
  // db instance
  protected collectionModel: Model<T>
  /**
   *
   * @param DB
   */
  constructor(DB: Model<T>) {
    this.collectionModel = DB
  }
  /**
   * get list
   * @param query 
   * @param queryParams 
   */
  public async list (
    query?: Parameters<Model<T>['find']>[0],
    queryParams: IPaginationQueryParams<K> = {}
  ) {
    const {
      limit = 10,
      offset = 0,
      sort = 'createdAt:asc',
      search = '',
      searchFields = [],
      fields = null
    } = queryParams

    const queryOptions = {} as any
    if (limit >= 1) {
      queryOptions.limit = +limit
    }
    if (offset >= 0) {
      queryOptions.offset = +offset
    }
    const matches = searchFields.map((field) => ({[field]: {
      $regex: new RegExp(search, 'gi')
    }}))
    
    queryOptions.sort = sort.split(',').reduce((sortFields: any, field) => {
      const sortValue = field.split(':')
      return {
        ...sortFields,
        [sortValue[0]]: sortValue[1] === 'asc' ? 1 : -1
      }
    }, {})
    const projections = fields ? fields.split(',').reduce((fields: any, fieldName) => ({
      ...fields,
      [fieldName]: 1
    }), {}) : null
    const documentQuery = this.collectionModel.find({
      $and: [
        query,
        ...(matches.length >= 1 ? [
          {
            $or: matches
          }
        ] : [])
      ]
    } as any,
      projections,
      queryOptions
    )
    return documentQuery
  }
  /**
   * by data by id
   * @param id
   */
  public async findById(id: string) {
    try {
      const document = await this.collectionModel
        .findById(id)
      return document
    } catch (error) {
      throw error
    }
  }
  /**
   * by data by id
   * @param id
   */
  public async findOne(
    query: Partial<K>,
    projection?: Partial<Record<keyof K, 0 | 1>>
  ) {
    const document = await this.collectionModel.findOne(query as any, projection).lean()
    return document as T
  }

  /**
   * insert data
   * @param data
   */
  public async insertOne(data: K) {
    const newDocument = await this.initialize(data).save()
    return newDocument.toObject()
  }
  /**
   * insert bulk/mutiple data
   * @param data
   */
  public insertMany(data: K[]) {
    return Promise.all(data.map(elem => this.insertOne(elem)))
  }
  /**
   * initialize object
   * @param data
   */
  public initialize(data: K) {
    return new this.collectionModel({
      _id: uuid(),
      createdAt: Date.now(),
      updatedat: 0,
      ...data,
    })
  }
  /**
   *
   * @param id
   * @param data
   */
  public async updateById(id: string, data: Partial<K>) {
    try {
      // @ts-expect-error
      delete data._id
      // @ts-expect-error
      delete data.id
      // @ts-expect-error
      delete data.createdAt
      const document = await this.findById(id)
      if (document) {
        document.set(data)
        document.save()
        return document.toObject()
      }
      return null
    } catch (err) {
      throw err
    }
  }
  /**
   * update single document
   * @param query
   * @param data
   */
  public async updateOne(
    query: Parameters<Model<T>['find']>[0],
    data: Partial<K>
  ) {
    const document = await this.collectionModel.findOne(query as any)
    if (document) {
      document.set(data)
      await document.save()
      return document.toObject()
    }
    return null
  }
  public async removeById(id: string) {
    const document = await this.findById(id)
    if (document) {
      document.remove()
      return document.toObject()
    }
    return document
  }

  public async removeOne(query: Parameters<Model<T>['find']>[0]) {
    const document = await this.collectionModel.findOne(query as any)
    if (document) {
      document.remove()
      return document.toObject()
    }
    return null
  }

  public async remove(query: Parameters<Model<T>['find']>[0]) {
    await this.collectionModel.remove(query as any)
    return true
  }

  public count(query: Parameters<Model<T>['find']>[0]) {
    return this.collectionModel
      .find(query as any)
      .countDocuments()
      .then(count => {
        return count
      })
  }
  /**
   *
   * @param pipeline a pipeline query for aggregation on mongodb
   * @param queryParams for filtering, like limitTo, startAt, sortby etc..
   * @param searchFields2 array of fields that needed to be search or to filter,
   * a function that return a pagination data.
   */
  public aggregateWithPagination (
    pipeline: any[],
    queryParams: IPaginationQueryParams<K>
  ): Promise<IAggregatePagination<K>> {
    let {
      fields = {},
      limit = 0,
      offset = 0,
      search = '',
      searchFields = [],
      sort = ''
    } = queryParams || {}
    limit = +limit
    offset = +offset

    // let sortTo = { createdAt: -1 } as any
    let sortTo: any = {}
    if (sort) {
      // proposal multiple sorting fields formating process
      const sortArrayOptions = sort.split(',');
      for (let i = 0; i < sortArrayOptions.length; i++) {
        let sortOption = sortArrayOptions[i].split(':');
        sortTo[sortOption[0]] = sortOption[1] === 'asc' ? 1 : -1;
      }

      // const sortOption = sort.split(':')
      // if (sortOption.length >= 1) {
      //   sortTo = {
      //     [sortOption[0]]: sortOption[1] === 'asc' ? 1 : -1
      //   }
      // }

      // sortTo = Array.isArray(sortBy)
      //   ? sortBy.reduce((obj, s) => {
      //       obj[s.fieldName] = parseInt(s.status)
      //       return obj
      //     }, {})
      //   : { [sortBy.fieldName]: sortBy.status }
    }
    const firstPipeline = [
      {
        $sort: sortTo,
      },
      {
        $skip: offset,
      },
      {
        $limit: limit,
      },
    ] as any[]
    // if limitTO is equal to = 0, will remove the $limit on the pipeline
    if (limit === 0) {
      const ind = firstPipeline.findIndex(
        stage => Object.keys(stage)[0] === '$limit'
      )
      if (ind >= 0) {
        // remove ethe $limit on the pipeline.
        firstPipeline.splice(ind, 1)
      }
    }

    // @ts-expect-error
    const searchFilters = searchFields.map((field: string) => ({
        [field]: {
          $regex: new RegExp(search, 'gi'),
        },
      })
    )
    const paginationQuery = pipeline.concat([
      {
        $match: searchFilters.length >= 1 ? {
            $or: searchFilters,
          } : {},
      },
      {
        $facet: {
          data: firstPipeline,
          totalPages: [
            {
              $group: {
                _id: null,
                counts: {
                  $sum: 1,
                },
              },
            },
          ],
        },
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: false,
          path: '$totalPages',
        },
      },
      {
        $project: {
          _id: 0,
          data: 1,
          counts: '$totalPages.counts',
        },
      },
    ])
    return this.collectionModel
      .aggregate(paginationQuery)
      .then((response: any) => {
        const paginationResponse = {
          data: [],
          total: 0,
          pages: 0,
        }
        if (response.length >= 1) {
          paginationResponse.data = response[0].data
          paginationResponse.pages =
            offset >= 1 ? Math.ceil(response[0].counts / offset) : 1
          paginationResponse.total = response[0].counts
        }
        return paginationResponse
      })
  }
  /**
   * 
   * @param pipeline 
   * @param paginationQuery 
   */
  public aggregate (
    pipeline: any[],
    paginationQuery?: Partial<IPaginationQueryParams<K>>
  ): Promise<any[]> {
    const {
      limit = 0,
      offset = 0
    } = paginationQuery || {}
    return this.collectionModel.aggregate(pipeline as any).exec()
  }
}
