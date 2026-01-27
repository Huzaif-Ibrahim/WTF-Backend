import dotenv from 'dotenv'
dotenv.config()
import app from './app.js'


app.listen(process.env.PORT || 3000, () => {
    console.log("App is listening to requests on port 3000.")
})