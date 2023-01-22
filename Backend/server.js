import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import rateLimit from 'express-rate-limit'
// import { executeScript } from './db_script/executeScript.js';

// executeScript('./db_script/script.sql')

// Routes
import authRoutes from './routes/authRoutes.js'
import artistRoutes from './routes/artistsRoutes.js'

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

const app = express()

app.enable('trust proxy');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

app.use(bodyParser.json());
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin)
            }
            return callback(
                "CORS ERROR origin: " + origin + " No authorization!"
            )
        },
        credentials: true,
    })
)

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use("/auth", authRoutes)
app.use("/artist", artistRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server started on: ${PORT}`)
})

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message)
})
