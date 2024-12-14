const express = require("express");
const mongoConnect = require("./db/connections");
const errorHandlingMiddleware = require("./middleware/errorHandling.middleware");
const cors = require("cors");



const app = express();

// CORS Options
const corsOptions = {
  origin: process.env.FRONT_URL,  // Allow your frontend domain
  methods: ['GET', 'POST', 'OPTIONS', 'PUT','DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies or credentials to be sent
  optionsSuccessStatus: 200, // Success status for OPTIONS request
};

// Use CORS middleware with the configured options
app.use(cors(corsOptions));

//body parser
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes will always go here
app.use("/", require("./routes/urls"));

// Error handling middleware
app.use(errorHandlingMiddleware);


// Connect to MongoDB Database
mongoConnect();

const port = process.env.PORT || 2005;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});