This file contains my personal notes which I have wrote in my notebook while following Jonas Schedman's backend course on Udemy.

video 2: WHAT IS EXPRESS?
-- Express is a minimal node.js framework, a higher level of abstraction.(Which mean it is actually built on top of node)

video 3: INSTALLING POSTMAN

video 4: Setting up express and Basic Routing.

video 5: APIs and RESTful API design.
-- API: Application programming interface. A piece of software that can be used by another piece of software, in order to allow applications to talk to each other.

-- REST(Representational States Transfer): Way of building web APIs in a logical way making then easy to consume.

Principles of REST API:
    1. Seperate API into logical resource.
    -- Object or representation of something, which has data associalted to it.
    Any information that can be named can be a resource.
    ex: tours, users, reviews. (use plurals)

    2. Expose structures, resource-based URLs.
    -- https://www.natours.com/addNewTour this whole is URL and 'addNewTour' is an Endpoint or API Endpoint.
    /getTour /updateTour /deleteTour /getToursById /deleteTourByUser, these all are considered as BAD ENDPOINTS because endpoints should be only contain resources(noun), and use HTTP methods for action.

    3. Use HTTP methods.
    -- For above examples for bad resource we can use-
    /getTour --> GET /tours
                 GET /tours?:id
    /addNewTour --> POST /tours
    /updateTour --> PUT /tours/:id (when whole new object is recieved)
                    PATCH /tours/:id (when only changes of an object is available)
    /deleteTour --> DELETE /tours/:id
    /getTourByUser --> GET /users/:id/tours
    /deleteToursByUser --> DELETE /users/:id/tours/:id

    4. Send data in JSON(usually).
    -- send response in json but if we add success status too then it is called as Jsend, and usually referred as best practice. res.send({ success: true, data: { tours } })

    5. Be stateless.
    -- Stateless RESTfull API: All states should be handelled on the client side. This means that each request must contain al the information necessary to process a certain response.
    The server should not have to remember the previous request.
    Ex. of state: LoggedIn, CurrentPage etc server should nto remember this, client should request with these details included.


video 6: Starting our API handelling GET requests.
-- There is a tours json file. Read that file using fs module and make a GET route '/api/v1/tours' and send json as Jsend format.

video 7: Handelling POST requests.
-- Made a post route to add tour.

video 8: Responding to URL parameters.
-- We can get access to parameters using req.params, but we need to make a route correctly-
app.get('/api/v1/tours/:id'). In req.params is an object and in that we can get id - req.params.id

app.get('/api/v1/tours/:id/:x{/:y}')
In the above route, id and x is mandatory, but y is optional. 


video 9: Handeling PATCH requests
-- We have 2 methods to update data - 1.PUT and 2.PATCH
1.PUT is used when we expect that our application recieves the entire new updated object.
2.PATCH, we only expect the properties that should actually be updated on the object.
We used PATCH and recieved tour id from params, data to update from body and updated the data.

video 10: handeling delete Requests.

video 11: Refactoring Our Routes.
1.Made variables that stores the function of each route. ex. const getAllRoutes = (req, res) => {}
2.Used app.route, we can use this when there are exact same routes but with different methods. Int his code we used - app.route('/api/v1/tours).get(getAllUsers).post(AddTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)


video 12(IMP): Middleware and Request-Response cycle.
1.It starts with incoming requests with req-res object.
2.Executes the middlewares that are in middleware stack.
3.Finally send the response to finish the cycle.

video 13: Creating Our own Middlewares.
video 14: Using third-party middlewares.

video 15: Implement the user Routes.
-- Made user routes and controllers but functionality not added.

video 16: Creating and Mounting Multiple Routers.
Router refers to - express.Router()
ex. const tourRouter = express.Router()
-- It is called as tour Router, and with the help of that router we can make multiple Routes, also, they are middlewares. We should use it as app.use('route/route'/tourRouter). It is called as MOUNTING ROUTERS.

In the above app.use, the first parameter is route which is common and in second parameter it is a ROUTER which is being MOUNTED and which contain route(the route which should be after the common route defined in first parameter of app.use) and controller.

REMEMBER, we used 3 methods to make/define routes.
1.Direct approach - app.get(route, controller)
2.Using app.route - app.route(commonRoute).get(getController).post(postController)
3.app.use - explained in 16th video.

