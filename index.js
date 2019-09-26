// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require("./iss");

const printPassTimes = function(passTmes) {
  for (const pass of passTmes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  printPassTimes(passTimes);
});

////////////////////
//ONLY FOR TESTING//
//and for review..//
////////////////////
/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP: ' , ip);
});

fetchCoordsByIP("66.207.199.230", (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
});

fetchISSFlyOverTimes({ latitude: '43.63830', longitude: '-79.43010' }, (error, data) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
});
*/
/////////////////
//END TEST CODE//
/////////////////