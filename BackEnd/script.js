// set up an express app
const port = 3000;
const express = require('express');
// import helmet for the first two user stories
const helmet = require('helmet');

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


// listen on the selected port @local host
app.listen(port);
console.log(`Listening on port ${port}`);
