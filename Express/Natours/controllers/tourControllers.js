import fs from 'fs'
import Tour from '../models/tourModel.js'

export const aliasTopCheapTours = (req, res, next) => {
    console.log('ALias middleware rinning!')
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
    
        const newTour = await Tour.create(req.body)

        res.status(200).json({
            success: true,
            message: "New Tour Created Successfully",
            data: {
                newTour
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: { error }
        })
    }

}

export const getAllTours = async (req, res) => {
    try {
        const finalQuery = {...req.query, ...req.customQuery}
        console.log(finalQuery)
        // Build Query
        
        // 1A. Filtering
        const queryObj = {...req.query}
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObj[el])

        // 1B. Advanced Filtering
        let queryString = JSON.stringify(queryObj)
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        // From: {duration: {gte: 5}} To {duration: {'$gte': 5}}

        let query = Tour.find(JSON.parse(queryString))

        // 2. Sorting
        if(finalQuery.sort){
            const sortBy = finalQuery.sort.replaceAll(',', ' ')
            query = query.sort(sortBy)
            // In mongoose, for sort, the query should be - .sort('price maxGroupSize')
            // - for descending order.
        } else {
            query = query.sort('-createdAt')
        }

        // 3. Field Limiting
        if(finalQuery.fields){
            const fields = finalQuery.fields.split(',').join(' ')
            query = query.select(fields)
            // In mongoose .select('field1 field2 field3') is used to show only those fields and '-' is used to hide them
        } else {
            query = query.select('-__v')
        }

        // 4. Pagination
        const page = finalQuery.page * 1 || 1
        const limit = finalQuery.limit * 1 || 100
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)
        // .skip(num) will skip the number of documents and .limit(num) will show only the specified number of dicuments.
        if(finalQuery.page){
            const totalDocuments = await Tour.countDocuments()
            if (skip >= totalDocuments) throw new Error('This page doesn\'t exist')
        }

        // Execute Query
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
