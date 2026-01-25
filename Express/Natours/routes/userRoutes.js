import express from 'express'
import { getAllUsers, addUser, getUser, updateUser, deleteUser } from '../controllers/userControllers.js'

const userRouter = express.Router()

userRouter
    .route('/')
    .get(getAllUsers)
    .post(addUser)
userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

export default userRouter
