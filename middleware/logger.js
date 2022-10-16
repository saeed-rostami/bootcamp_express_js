// @log req in console
const logger = (req, res, next) => {

    console.log(`method is :${req.method},
     host is : ${req.get('host')},
     protocol is : ${req.protocol},
     url : ${req.originalUrl},
     `);

     next();
};

module.exports = logger;