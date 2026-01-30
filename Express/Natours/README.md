This file contains my personal notes which I have wrote in my notebook while following Jonas Schedman's backend course on Udemy.

video 2: WHAT IS EXPRESS?
-- Express is a minimal node.js framework, a higher level of abstraction.(Which mean it is actually built on top of node)

video 3: INSTALLING POSTMAN

video 4: Setting up express and Basic Routing.

video 5: APIs and RESTful API design.
-- API: Application programming interface. A piece of software that can be used by another piece of software, in order to allow applications to talk to each other.

-- REST(Representational States Transfer): Way of building web APIs in a logical way making them easy to consume.

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
                 GET /tours/:id
    /addNewTour --> POST /tours
    /updateTour --> PUT /tours/:id (when whole new object is recieved)
                    PATCH /tours/:id (when only changes of an object is available)
    /deleteTour --> DELETE /tours/:id
    /getTourByUser --> GET /users/:id/tours
    /deleteToursByUser --> DELETE /users/:id/tours/:id

    4. Send data in JSON(usually).
    -- send response in json but if we add success status too then it is called as Jsend, and usually referred as best practice. res.send({ success: true, data: { tours } })

    5. Be stateless.
    -- Stateless RESTfull API: All states should be handelled on the client side. This means that each request must contain all the information necessary to process a certain response.
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
2.Used app.route, we can use this when there are exact same routes but with different methods. In this code we used - app.route('/api/v1/tours).get(getAllUsers).post(AddTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)


video 12(IMP): Middleware and Request-Response cycle.
1.It starts with incoming requests with req-res object.
2.Executes the middlewares that are in middleware stack.
3.Finally send the response to finish the cycle.
(Every controller(final handler/function which sends res.send after all the middlewares) is technically a middleware, but not every middleware is a controller.)

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

video 17: Better file structure
-- routes folder to store routes i.e. tourRoutes.js stores tourRouter = express.Router
   controllers folder to store handler functions of routes which will be imported by route files.

video 18: Param Middleware
-- It is used to check the param and run that controller only if that param is present in the url. Basically, it is a middleware that will only run before the controller which contain the specified param in it's url

video 19: Chaining Multiple Middleware Functions
-- When we want to run a middleware before a function only to a specific route then we an write the middleware function before the main controller.
i.e. tourRouter.route('/').get(getTours).post(middleware, addTour)
In the above code, when we request POST request at '/' then first the middleware will run then addTour will run.

video 20: Serving Static Files
-- If we have public folder and in that some html and imgs then we can't access then through soeifying route in chrome, we need to first use a middleware called express.static(route of files) and then we can access files diretly from browser or requesting.
i.e. app.use(express.static('./public')) and in browser localhost:3000/overview.html, we will get html folder.

video 21: Environment variables
-- Environment variables are key–value settings provided to a program by the operating system to control how the program behaves, without changing its code.
• process → Core Node.js object (no import needed)
• process.env → Stores all environment variables (global)

WHY ENV VARIABLES?
• Control app behavior without changing code
• Separate config from logic
• Used for ports, DB creds, API keys, modes

KEY ENVIRONMENT:
• development
• production

NODE_ENV
• Convention (not auto-set by Express)
• Common values: "development", "production"
• Used to enable/disable features

CHECK ENV:
• process.env.NODE_ENV
• app.get('env')   // Express env (defaults to development)

SET ENV VARIABLES
• Mac/Linux:
  NODE_ENV=development nodemon server.js
• Windows (CMD):
  set NODE_ENV=development && nodemon server.js

.env / config.env FILE
• Stores environment variables
• One per line, UPPERCASE
• Example:
  NODE_ENV=development
  PORT=3000
  DB_PASSWORD=1234

dotenv PACKAGE
• Loads .env into process.env
• Install: npm install dotenv
• Use (server.js):
  const dotenv = require('dotenv');
  dotenv.config({ path: './config.env' });

⚠️ LOAD ORDER (IMPORTANT)
• dotenv.config() MUST run before app code
• Correct:
  dotenv.config();
  const app = require('./app');

USING ENV VARIABLES
• Port:
  const port = process.env.PORT || 3000;
• Conditional middleware:
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

GLOBAL ACCESS
• process.env works in ALL files
• Same Node process

PACKAGE.JSON SCRIPTS
• "start:dev": "NODE_ENV=development nodemon server.js"
• "start:prod": "NODE_ENV=production node server.js"

DO NOT PUSH TO GITHUB
• .env / config.env
• Add to .gitignore

CORE IDEA
• ENV VARIABLES = CONFIGURATION, NOT CODE


**Notes about Introduction is written only in Book. 