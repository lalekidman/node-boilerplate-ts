import { IUserUsecaseDependencies } from './interfaces'

export const makeUserViewDetailsUsecase = (
  {
    repositoryGateway
  }: IUserUsecaseDependencies
) => {
  return class UserViewDetailsUsecase {
    constructor() {}
    /**
     * get one user
     * @param id 
     * @returns 
     */
    public async getOne(
      id: string
    ) {
      return repositoryGateway.findOne({
        _id: id
      })
    }
    /**
     * get one user
     * throw error of no user data found.
     * @param id 
     * @returns 
     */
    public async getOneStrict(
      id: string
    ) {
      const user = await this.getOne(id)
      if (!user) {
        throw new Error("No user data found.")
      }
      return user
    }
  }
}
