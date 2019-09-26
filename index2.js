const { /*fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes*/ nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTimes = function(passTmes) {
  for (const pass of passTmes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation()
  .then((passTmes) => { //passTimes is the data that is returned from nextISSTimesForMyLocation()
    printPassTimes(passTmes);
  })
  //error will be whichever error message gets sent via whichever function caused the error
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
// fetchMyIP() //the return value of this is the geo IP address...
//   //which somehow is fed into fetchCoordsByIP...
//   .then(fetchCoordsByIp) //not calling the function, no parentheses...?
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));
