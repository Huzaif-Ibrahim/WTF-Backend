import mongoose from 'mongoose'
import slugify from 'slugify'

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have price'],
        unique: true,
        trim: true
    },
    slug: String,
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
    },
    secretTour: {
        type: Boolean,
        default: false
    }
}, { toJSON: {virtuals: true}, toObject: {virtuals: true}})


// DOCUMENT MIDDLEWARE
// Runs before saving document in db.
tourSchema.pre('save', function(){
    this.slug = slugify(this.name, { lower: true })
})
// Runs after saving document in db
tourSchema.post('save', function(){
    console.log(this)
})

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function(){
    this.find({ secretTour: { $ne: true }})
})

// tourSchema.post('find', function(doc){
//     console.log(this)
// })

// AGGREGATE MIDDLEWARE
tourSchema.pre('aggregate', function(){
    console.log(this)
})

tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7
})


const Tour = mongoose.model('Tour', tourSchema)

export default Tour