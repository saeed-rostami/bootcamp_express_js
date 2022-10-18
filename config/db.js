const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
        useUnifiedTopology : true,

    });

    console.log(`Connect to ${conn.connection.host}`.cyan.underline.bold);

}

module.exports = connectDB;
