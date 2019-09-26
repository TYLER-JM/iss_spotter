const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });

};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP ${body}`, null));
      return;
    }
    // OLD IMPLEMENTATION
    // const geo = {
    //   latitude: JSON.parse(body).data.latitude,
    //   longitude: JSON.parse(body).data.longitude
    // };
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.latitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP ${body}`, null));
      return;
    }
    const arr = JSON.parse(body).response;
    callback(null, arr);
  });
};

////////////////
//ENCOMPASSING//
//the other 3 //
////////////////

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });


  /////////////////////
  //MY IMPLEMENTATION//
  //  did not work   //
  /////////////////////
  /*
  let IP = fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    return ip; // CHANGED FROM console.log(ip);
  });

  if (!IP) return callback(`ERROR with IP::: ${IP}`, null);

  let geoCoords = fetchCoordsByIP(IP, (error, data) => { //IP should be: "66.207.199.230"
    if (error) {
      console.log(error);
      return;
    }
    return data; // CHANGED FROM console.log(data);
  });

  if (!geoCoords) return callback(`ERROR with geoCoords::: ${geoCoords}`, null);

  let arrayOfTimes = fetchISSFlyOverTimes(geoCoords, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    return data; //CHANGED FROM console.log(data);
  });

  if (!arrayOfTimes) return callback(`ERROR with arrayOfTimes::: ${arrayOfTimes}`, null);

  callback(null, arrayOfTimes);

  */
};

module.exports = { nextISSTimesForMyLocation };
// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
