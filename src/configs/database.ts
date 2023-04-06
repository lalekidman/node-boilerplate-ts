import mongoose from 'mongoose'
export class Database {
  /**
   * connect to the repository/database
   */
  public connect() {
    const databaseConnectionString = (process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST_URI :  `${process.env.DB_PREFIX}://${process.env.DB_HOST}/${process.env.DB_NAME}`) as string
    return mongoose
      .connect(databaseConnectionString, {
        useNewUrlParser: true,
      })
      .then(() => {
        console.log('Successfully connected to database.')
        return true
      })
      .catch(err => {
        console.log('Failed to connect to the database. Error: ', err)
        throw err
      })
  }
  /**
   * connect to the repository/database
   */
  public close() {
    return mongoose.disconnect()
  }
}
