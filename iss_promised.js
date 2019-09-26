const request = require("request-promise-native");

const fetchMyIP = function() {
  return request("https://api.ipify.org/?format=json");
};

const fetchCoordsByIp = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  // let arrOfTimes = JSON.parse(x).
  const { latitude, longitude } = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = function(x) {
  return fetchMyIP()
    .then(fetchCoordsByIp) //not calling the function, no parentheses...?
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { /*fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes*/ nextISSTimesForMyLocation };