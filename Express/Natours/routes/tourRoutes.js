import express from 'express'
import {getAllTours, addTour, getTour, updateTour, deleteTour, checkId, checkBody} from '../controllers/tourControllers.js'

const tourRouter = express.Router()

// This middleware will run before the routes which contain id in it's parameter.
tourRouter.param('id', checkId)

tourRouter
    .route('/')
    .get(getAllTours)
    .post(checkBody, addTour)
tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

export default tourRouter