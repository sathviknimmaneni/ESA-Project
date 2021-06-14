const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//access .ENV config files for api keys
require("dotenv").config();

//import routers
const booksRouter = require("./routes/manageBooks.js");
const usersRouter = require("./routes/manageUsers.js");

const app = express();

//Allow for transactions to be up to 50MB
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// set up connection to database
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((val) => console.log("Connected to DB"))
  .catch((err) => {
    if (err) {
      console.log(`Fuck, didn't connect to DB: ${err}`);
    }
  });

//connect various endpoints
app.use("/books", booksRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT || 5000, () =>
  console.log("listening on port 5000")
);
