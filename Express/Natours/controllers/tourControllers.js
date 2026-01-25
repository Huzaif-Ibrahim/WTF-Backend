import fs from 'fs'
const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`))

export const getAllTours = (req, res) => {
    // console.log(req.requestedTime)

    res.status(200).json({
        success: true,
        requestedAt: req.requestedTime,
        results: tours.length,
        data: tours
    })
}

export const addTour = (req, res) => {
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
}

export const getTour = (req, res) => {
    const id = req.params.id
    console.log(typeof(id)) //String
    const tour = tours.find(elem => elem.id == id)

    tour ? res.status(200).json({
        success: true,
        requestedAt: req.requestedTime,
        data : { tour }
    }) : res.status(404).json({
        success: false,
        message: "No data found with that id"
    })
}

export const updateTour = (req, res) => {
    const id = req.params.id * 1
    const { name, duration } = req.body

    if(id >= tours.length) return res.status(404).json({ success: false, message: "Invalid id" })

    const tour = tours.find(elem => elem.id === id)
    if(!tour) return res.status(404).json({ success: false, message: "No tour found" })

    tour.name = name
    tour.duration = duration
    tours.map(elem => {
        if(elem.id === id){
            elem = tour     //Change the main tour in folder with updated tour
        }
    })
    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(tours), err => {
        res.status(200).json({
            success: true,
            data: {
                updatedTour: tour
            }
        })
    })
}

export const deleteTour = (req, res) => {
    const id = req.params.id * 1

    const tour = tours.find(elem => elem.id === id)
    if(!tour) return res.status(404).json({ success: false, message: "No tour found" })

    const updatedTour = tours.filter(elem => elem.id !== id)

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTour), err => {
        res.status(204).json({
            success: true,
            message: "Deleted successfully"
        })
    })

}