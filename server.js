const express = require('express');
const dotenv = require('dotenv');

// Load env Variables
dotenv.config({path: "./config/config.env"});

const app = express();

const PORT = process.env.port || 8080;

console.log(process.env.NODE_ENV);

app.listen(PORT, 
    console.log(`Server Running On ${process.env.NODE_ENV} On Port ${process.env.PORT}`));