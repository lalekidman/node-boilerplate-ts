require('dotenv').config()
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import compressor from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import session from 'express-session'
import { Database } from '@app/configs/database'
import '@app/configs/passport'
import { AppRoute } from '@app/routes'
export class App {
  public app: any
  public io: any
  private port: number = process.env.PORT ? Number(process.env.PORT) : 3000
  constructor() {
    this.app = express()
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
    this.app.use(session({
      secret: "sample-secret",
      resave: false,
      rolling: true, // forces resetting of max age
      saveUninitialized: true,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days,
        secure: process.env.NODE_ENV === 'production' // this should be true only when you don't want to show it for security reason
      }
    }))
    this.app.use(compressor())
    this.app.use(helmet())
    this.app.use(cors())
    
  }
}
