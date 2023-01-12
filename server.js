const express = require('express');
const dotenv = require('dotenv');
// const logs = require("./middleware/logger");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandles = require("./middleware/error");
const fileUpload = require('express-fileupload');
const path = require('path');


// Load env Variables
dotenv.config({path: "./config/config.env"});

connectDB();
// console.log(process.env.MONOG_URL);


//route files
const bootcamp = require("./routes/bootcamps");
const course = require("./routes/courses");

//express
const app = express();


// app.use(logs);
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}
// body parser

// app uses
app.use(express.json());
app.use(fileUpload());


// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// mount routes
app.use("/api/v1/bootcamps", bootcamp);
app.use("/api/v1/courses", course);
app.use(errorHandles);

const PORT = process.env.port || 3000;

//server connection
const server = app.listen(PORT,
    console.log(`Server Running On ${process.env.NODE_ENV} On Port ${process.env.PORT}`.blue.underline.bold));

process.on("unhandled Reejction", (err, promise) => {
    console.log(`Error ${err.message}`.red.underline.bold);
    // Close Server
    server.close(() => {
        process.exit(1);
    })
});