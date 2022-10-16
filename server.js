const express = require('express');
const dotenv = require('dotenv');
const bootcamp = require("./routes/bootcamps");
// const logs = require("./middleware/logger");
const morgan = require("morgan");

// Load env Variables
dotenv.config({path: "./config/config.env"});

//express
const app = express();


// app.use(logs);
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// app uses
app.use("/api/v1/bootcamps", bootcamp);

const PORT = process.env.port || 3000;

//server connection
app.listen(PORT,
    console.log(`Server Running On ${process.env.NODE_ENV} On Port ${process.env.PORT}`));