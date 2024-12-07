const express = require("express");
const mongoConnect = require("./db/connections");
const errorHandlingMiddleware = require("./middleware/errorHandling.middleware");


const app = express();

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