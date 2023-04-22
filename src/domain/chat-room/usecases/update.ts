
// import {
//   IUserInput,
//   UserEntity
// } from '../entity'

// import { IUserUsecaseDependencies } from './interfaces'

// export const makeUserUpdateUsecase = (
//   {
//     repositoryGateway
//   }: IUserUsecaseDependencies
// ) => {
//   return class UserUpdateUsecase {
//     constructor() {}
    
//     /**
//      * update user details
//      * @param data 
//      * @returns 
//      */
//     public async update (
//       id: string,
//       dataInput: Partial<Omit<IUserInput, 'oauth'>>
//     ) {
//       const user = await repositoryGateway.findOne({_id: id})
//       if (user) {
//         const entity = new UserEntity(dataInput)
//         await repositoryGateway.updateOne({
//           _id: id,
//         }, {
//           ...(entity.firstName ? {firstName: entity.firstName} : {}),
//           ...(entity.lastName ? {lastName: entity.lastName} : {}),
//           ...(entity.profileImageUrl ? {profileImageUrl: entity.profileImageUrl} : {}),
//           ...(entity.displayName ? {displayName: entity.displayName, slug: entity.slug} : {}),
//         })
//         return entity.toObject()
//       }
//       return null
//     }
//     /**
//      * update suspend status
//      * @param data 
//      * @returns 
//      */
//     public async updateSuspendStatus(
//       id: string,
//       status: boolean
//     ) {
  
//       const user = await repositoryGateway.findOne({
//         _id: id
//       })
//       if (user) {
//         const entity = new UserEntity(user)
//         if (status) {
//           entity.suspend()
//         } else {
//           entity.unsuspend()
//         }
//         await repositoryGateway.updateOne({
//           _id: id,
//         }, {
//           suspended: entity.suspended,
//           suspendedAt: entity.suspendedAt
//         })

//         return entity.toObject()
//       }
//       return null
//     }
//   }
// }