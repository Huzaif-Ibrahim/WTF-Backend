import mongoose from 'mongoose'

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

export default Tour