import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import app from './app.js'

const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, { dbName: "natours" })
    .then(() => console.log("App connected to DB!"))
    .catch(err => console.log({db_error : err}))

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name is required!'],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, 'Price of tour is required!']
    },
    rating: {
        type: Number,
        default: 3
    }
})

const Tour = mongoose.model('Tour', tourSchema)

const testTour = new Tour({
    name: 'The forest hiker3',
    price: 400,
    rating: 5
}) 
// console.log(testTour)

// testTour.save()
//     .then(doc => console.log(doc))
//     .catch(err => console.log(err))

app.listen(process.env.PORT || 3000, () => {
    console.log("App is listening to requests on port 3000.")
})