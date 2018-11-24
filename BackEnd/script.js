// set up an express app
const port = 3000;
const express = require('express');
// import helmet for the first two user stories
const helmet = require('helmet');
// import the function to convert beterrn units of measure
const { isValidMeasure, convertMeasure } = require('./utility.js');

const app = express();

// include the static files in the public folder
app.use(express.static(`${__dirname}/public`));

// include the helmet middleware to prevent MIME sniffing and cross site scripting
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

// send the HTML file in the root path of the application
app.get('/', (req, res, next) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

// listen for a get request at the prescribed endpoint
app.get('/api/convert', (req, res, next) => {
  // consider the query string argument, to find a value for _input_
  const { input } = req.query;
  // if the request contains an input argument continue, else send a message detailing the occurence
  if (input) {
    // check if the input argument has a valid unit of measure
    // isValidMeasure returns a boolean and the unit matching the true instance
    const { isValid, unit } = isValidMeasure(input);
    // if valid proceed converting the input, else detail the occurrence
    if (isValid) {
      // convertMeasure returns a JSON object detailing the imperial and metric measure
      const convertedMeasure = convertMeasure(input, unit);
      res.json(convertedMeasure);
    } else {
      res.json({
        error: 'Invalid input',
        validInput: '1foot'
      });
    }
  } else {
    res.json({
      error: 'Please include a valid request',
      validRequest: '/api/convert?input=4gal'
    });
  }
});


// listen on the selected port @local host
app.listen(port);
console.log(`Listening on port ${port}`);
