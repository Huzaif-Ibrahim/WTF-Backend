import mongoose from 'mongoose'

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have price'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, "A Tour must have duration!"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A Tour must have group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have difficulty']
    },
    ratingAverage: {
        type: Number,
        default: 3
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A Tour must have price']
    },
    priceDiscount: Number,  
    imageCover: {
        type: String,
        required: [true, 'A Tour must have cover image']
    },
    images: [String],
    summary: {
        type: String,
        required: [true, 'A Tour must have summary'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    startDates: [Date],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

const Tour = mongoose.model('Tour', tourSchema)

export default Tour