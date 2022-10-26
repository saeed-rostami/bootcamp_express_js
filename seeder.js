const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

// // Load env
dotenv.config({path: "./config/config.env"});
//
// //load models
const Bootcamp = require("./models/Bootcamp");
const Course = require("./models/Course");
//
// // Connect DB
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
});

// //READ JSON FILES
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

//import into DB
const importsData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log(`Data Imported`.green.bold);
        process.exit();
    } catch (e) {
        console.log(`Error ${e}`.red.bold);

    }
};


//delete from DB
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log(`Data Deleted`.green.bold);
        process.exit();
    } catch (e) {
        console.log(`Error ${e}`.red.bold);

    }
};

if (process.argv[2] === "-i") {
    importsData().then(r => console.log(r));
} else if (process.argv[2] === "-d") {
    deleteData().then(r => console.log(r));
}




