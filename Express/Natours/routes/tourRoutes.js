import express from 'express'
import {getAllTours, addTour, getTour, updateTour, deleteTour} from '../controllers/tourControllers.js'

const tourRouter = express.Router()

tourRouter
    .route('/')
    .get(getAllTours)
    .post(addTour)
tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

export default tourRouter