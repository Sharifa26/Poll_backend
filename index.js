const express = require("express");
const mongoConnect = require("./db/connections");
const errorHandlingMiddleware = require("./middleware/errorHandling.middleware");
const cors = require("cors");



const app = express();

//body parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes will always go here
app.use("/", require("./routes/urls"));

// Error handling middleware
app.use(errorHandlingMiddleware);

// Enable CORS for the frontend URL
const corsOptions ={
  origin: '*', // Allow the specific frontend URL
  credentials: true,             // Allow credentials like cookies, authorization headers, etc.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  optionsSuccessStatus: 204      // Status code for successful OPTIONS requests
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));  // Allow preflight requests for all routes



// Connect to MongoDB Database
mongoConnect();

const port = process.env.PORT || 2005;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});