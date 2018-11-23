// set up an express app
const port = 3000;
const express = require('express');


const app = express();

// include the static files in the public folder
app.use(express.static(`${__dirname}/public`));

// send the HTML file in the root path of the application
app.get('/', (req, res, next) => {
  res.sendFile(`${__dirname}/views/index.html`);
});


// listen on the selected port @local host
app.listen(port);
console.log(`Listening on port ${port}`);
