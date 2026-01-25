import express from 'express'
import morgan from 'morgan'
import tourRouter from './routes/tourRoutes.js'
import userRouter from './routes/userRoutes.js'

const app = express()


// Middlewares

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// This function will be called before the response of all the routes that are defined after this.
// own MIDDLEWARES
app.use((req, res, next) => {
    console.log("Hellow from middleware👋🏻")
    next()
})
app.use((req, res, next) => {
    req.requestedTime = new Date().toISOString()
    next()
})
// Third-party MIDDLEWARE
app.use(morgan('dev'))

// Base URL
app.get("/", (req, res) => {
    res.send("Hello")
})

// Middleware to use ROUTER, and also this is called as MOUNTING OF ROUTER
app.use('/api/v1/tours', tourRouter) // for '/api/v1/tours' we apply tourRouter middleware
app.use('/api/v1/users', userRouter) // for '/api/v1/users' we apply userRouter middleware

app.listen(3000, () => {
    console.log("App is listening to requests on port 3000.")
})