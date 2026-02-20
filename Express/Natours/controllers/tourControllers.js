import Tour from '../models/tourModel.js'
import APIFeature from '../utils/apiFeatures.js'

export const aliasTopCheapTours = (req, res, next) => {
    console.log('Alias middleware rinning!')
    req.customQuery = {
        limit: '5',
        sort: 'price,-ratingAverage'
    }
    next()
}

export const aliasTopTours = (req, res, next) => {
    console.log('ALias middleware rinning!')
    req.customQuery = {
        limit: '5',
        sort: '-ratingAverage,price'
    }
    next()
}

export const addTour = async (req, res) => {
    try {
        // const newTour = new Tour({})
        // newTour.save()
        // console.log(req.body)
    
        const newTour = await Tour.create(req.body)

        res.status(200).json({
            success: true,
            message: "New Tour Created Successfully",
            data: {
                newTour
            }
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const getAllTours = async (req, res) => {
    try {
        // const finalQuery = {...req.query, ...req.customQuery} // Adds middleware object also for custom route.
      
        // const query = new APIFeature(Tour.find(), finalQuery)
        //     .filter()
        //     .sort()
        //     .fieldLimiting()
        //     .pagination()
        // const tours = await query.query
        console.log('req.query : ',req.query)

        let queryObj = {...req.query}

        // Excluding fields
        const excludeFields = ['limit','page','sort','fields']
        excludeFields.forEach(element => {
            delete queryObj[element]
        });
        console.log('After excluding fields: ', queryObj)

        // Adding $ 
        let queryString = JSON.stringify(queryObj)
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        console.log('After replacing $: ',JSON.parse(queryString))

        let query = Tour.find(JSON.parse(queryString))

        // Sorting 
        if(req.query.sort){
            const sortBy = req.query.sort.replaceAll(',',' ')
            query = Tour.sort(sortBy)
        } 

        const tours = await query

        res.status(200).json({
            success: true,
            results: tours.length,
            data: {
                tours
            }
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error
        })
    }
}

export const getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id)
    
        tour ? res.status(200).json({
            success: true,
            data: {
                tour
            }
        }) : res.status(404).json({
            success: false,
            message: "Tour not found"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error
        })
    }
}

export const updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(204).json({
            success: true,
            message: "Updated Successfully!",
            updatedData: {
                tour
            }
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error
        })
    }
}

export const deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "Deleted Successfully!"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error
        })
    }
}

export const getTourStats = async (req, res) => {
    try {

        const tours = await Tour.aggregate([
            {
                $group: {
                    _id: { $toUpper: '$difficulty' },
                    numTours: { $sum: 1 },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                    avgRating: { $avg: '$ratingQuantity' },
                    numRating: { $sum: '$ratingQuantity' }
                }
            },
            {
                $sort: { avgPrice: 1 }
            }
        ])

        res.status(200).json({
            success: true,
            results: tours.length,
            data: {
                tours
            }
        }) 
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error
        })
    }
}

export const getMonthlyPlan = async (req, res) => {
    try {
        const { year } = req.params

        const tour = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTourStarts: { $sum: 1 },
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $sort: { numTourStarts: -1 }
            },
            {
                $limit: 12
            }
        ])

        res.status(200).json({
            success: true,
            results: tour.length,
            data: {
                tour
            }
        }) 
        
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error
        })
    }
}