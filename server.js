const express = require('express'); // importing a CommonJS module
const morgan = require('morgan');
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//middleware
// server.use(morgan("short")); //third party middleware (security)
server.use(logger);
server.use(helmet()); //third party middleware (tracking)
// server.use(passKey);

server.use(express.json()); // built in middleware


//endpoints
server.use('/api/hubs',passKey("mellon"), hubsRouter);
server.get('/', passKey("hello"), (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

function logger(req, res, next){
  console.log(`${req.method} Request to ${req.originalUrl}`);
  next();
}

function passKey(password){
  return function (req, res, next){
  const {pass} = req.query;
  if(pass === password){
    next()
  } else{
    res.status(404).json({message: "You Shall not pass"})
  }
}
}
