const args = process.argv.slice(2);
const source = args[0];
const location = args[1];

const request = require('request');
const fs = require('fs');

//checks for a valid file path
if (typeof(location) === "undefined"){
  console.log('Please check for valid file path');
  process.exit();
}

//request function to request info of source
request(source, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
  } else if (response.statusCode !== 200) {
    console.log('Please check for a valid URL!');
  } else {
    checkFileExists(location, response, body);
  }
});

//Write function allows us to write the response to a new file
const writeToFile = (response, body) => {
  fs.writeFile(location, body, err => {
    if (err) {
      console.log(`Error: `, err);
    } 
    console.log(`Downloaded and saved ${response.headers['content-length']} bytes to ${location}`);
  });
};

//checks to see if file already exists
const checkFileExists = (location, response, body) => {
  fs.access(location, fs.constants.F_OK, err => {
    if (err) {
      writeToFile(response, body);
    } else {
      console.log('This file will be overwritten!') 
      writeToFile(response, body);
    }
  });
};