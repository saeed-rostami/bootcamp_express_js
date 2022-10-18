const express = require('express');
const dotenv = require('dotenv');
const bootcamp = require("./routes/bootcamps");
// const logs = require("./middleware/logger");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");

// Load env Variables
dotenv.config({path: "./config/config.env"});

connectDB();
// console.log(process.env.MONOG_URL);

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
const server = app.listen(PORT,
    console.log(`Server Running On ${process.env.NODE_ENV} On Port ${process.env.PORT}`.blue.underline.bold));

    process.on("unhandled Reejction" , (err, promise) => {
        console.log(`Error ${err.message}`.red.underline.bold);
        // Close Server
        server.close(() => {
            process.exit(1);
        })
    });