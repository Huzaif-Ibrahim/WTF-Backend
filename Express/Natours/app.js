import fs from 'fs'
import express from 'express'

const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`))
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Base URL
app.get("/", (req, res) => {
    res.send("Hello")
})

// Route to get all the tours.data
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        success: true,
        results: tours.length,
        data: tours
    })
})

// Route to add tour/data
app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1    // makes the id, because if we use db then we don't need to specify the id ourself.
    const newData = Object.assign({ id: newId }, req.body)  // This will join the objects.
    tours.push(newData) // Pushes the new tour/data into tours Array which will cointain all the objects.

    // Writes the file with new data after adding the new tour object.
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
        res.status(201).json({
            success: true,
            data: {
                tour: newData
            }
        })
    })
})

// /api/v1/tours/:id/:x/:y => all three id, x and y are compulsary
// /api/v1/tours/:id/:x{/:y} => y is not compulsary

// Route to get tour/object by id using PARAMETER.
app.get("/api/v1/tours/:id", (req, res) => {
    const id = req.params.id
    console.log(typeof(id)) //String
    const tour = tours.find(elem => elem.id == req.id)

    tour ? res.status(200).json({
        success: true,
        data : { tour }
    }) : res.status(404).json({
        success: false,
        message: "No data found with that id"
    })
})
// Test PARAMETERS, y is optional here but, id and x are mandatory.
app.get("/api/v1/tours/:id/:x{/:y}", (req, res) => {
    console.log(req.params)
    res.send("done")
})

app.listen(3000, () => {
    console.log("App is listening to requests on port 3000.")
})