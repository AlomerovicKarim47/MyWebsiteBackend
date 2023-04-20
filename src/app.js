import express, {json, urlencoded} from 'express'
import cors from 'cors'
import config from './config/index.js' 
import routes from './routes/index.js'

const startServer = async() => {
    const app = express()
    app.use(json())
    app.use(urlencoded({extended:false}))
    app.use(cors({origin: config.ALLOWED_ORIGIN}))
    app.use(routes)
    app.listen(config.PORT)
    console.log(`App listening on port ${config.PORT}`)
}

startServer()