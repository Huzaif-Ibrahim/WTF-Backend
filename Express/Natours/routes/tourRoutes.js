import express from 'express'
import {getAllTours, addTour, getTour, updateTour, deleteTour, aliasTopCheapTours, aliasTopTours, aliasTopExpensiveTours, getTourStats, getMonthlyPlan} from '../controllers/tourControllers.js'

const tourRouter = express.Router()

// This middleware will run before the routes which contain id in it's parameter.
// tourRouter.param('id', checkId)

tourRouter.route('/top-5-cheap-tours').get(aliasTopCheapTours, getAllTours)
tourRouter.route('/top-5-expensive-tours').get(aliasTopExpensiveTours, getAllTours)
tourRouter.route('/top-5-tours').get(aliasTopTours, getAllTours)
tourRouter.route('/tour-stats').get(getTourStats)
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan)

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