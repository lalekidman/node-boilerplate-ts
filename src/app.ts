require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compressor from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import {Database} from '@app/configs/database'
import {AppRoute} from '@app/routes'
export class App {
  public app: any
  public io: any
  private port: number = 3000
  constructor() {
    this.app = express()
    if (process.env.PORT) {
      this.port = +process.env.PORT
    }
    this.loadMiddlewares()
    new Database().connect()
    // expose the main route here.
    this.app.use(new AppRoute().expose())
  }
  /**
   * expose the server port.
   */
  public listen(port: number = this.port): void {
    this.app.listen(port, () => {
      console.log(`Listening to port ${port}`)
    })
  }
  /**
   * load middlewares
   */
  private loadMiddlewares() {
    this.app.use(morgan('dev'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(compressor())
    this.app.use(helmet())
    this.app.use(cors())
  }
}
