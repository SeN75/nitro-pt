
//Importing dependencies
const express = require('express');
var path = require('path');

//Starting Express app
const app = express();

//Set the base path to the nitro-pt dist folder
app.use(express.static(path.join(__dirname, 'dist/nitro-pt')));

//Any routes will be redirected to the angular app
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/nitro-pt/index.html'));
});

//Starting server on port 8081
app.listen(8081, () => {
  console.log('Server started!');
  console.log('on port 8081');
});
