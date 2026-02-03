import fs from 'fs'
import Tour from '../models/tourModel.js'

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
        const tours = await Tour.find()

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
