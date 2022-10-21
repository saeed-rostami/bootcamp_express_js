const NodeGeoCoder = require("node-geocoder");

const options = {
    provider: "mapquest",
    httpAdapter: "https",
    apiKey: "59xJGgk8QPq54wfBO7FQFdAjQnHHWYX0",
    formatter: null
};

const geoCoder = NodeGeoCoder(options);

module.exports = geoCoder;


