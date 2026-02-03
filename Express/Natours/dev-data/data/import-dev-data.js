import dotenv from 'dotenv'
dotenv.config({path: '../../.env'})
import mongoose from 'mongoose'
import fs from 'fs'
import Tour from '../../models/tourModel.js'

const tour_json = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'))

// const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD)
const DB = process.env.DATABASE.replace('<db_password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, { dbName: 'natours' })
    .then(() => console.log('Connected to DB.'))
    .catch(err => console.log(err))

const importData = async () => {
    try {
        await Tour.create(tour_json)
        console.log('Data imported successfully.')
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log('Data deleted successfully.')
    } catch (error) {
        console.log(error)
    }
    process.exit()
}

if(process.argv[2] === '--import'){
    importData()
}else if(process.argv[2] === '--delete'){
    deleteData()
}