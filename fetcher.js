const args = process.argv.slice(2);
const source = args[0];
const location = args[1];

const request = require('request');
const fs = require('fs');

//request function to request info of source
request(source, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
  } else {
    writeToFile(response, body);
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