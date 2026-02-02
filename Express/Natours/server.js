import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import app from './app.js'

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, { dbName: "natours" })
    .then(() => console.log("App connected to DB!"))
    .catch(err => console.log({db_error : err}))

app.listen(process.env.PORT || 3000, () => {
    console.log("App is listening to requests on port 3000.")
})