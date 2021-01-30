const request = require('postman-request');

const forcast = function(lat,long,callback)
{
let url =`http://api.weatherstack.com/current?access_key=54a92814e3a6baa68fbe44c4baff9bcc&query=${lat},${long}&units=m`;

request({url:url , json: true}, function(error,response)
{
    if(error)
    {
        callback('Unable to connect to API service',undefined);
    }
    else if(response.body.error)
    {
        callback('Unable to get the location',undefined);
    }
    else{
      callback(undefined,{
          Forcast: `${response.body.current.weather_descriptions[0]}`,
          Temperature: `It is currently ${response.body.current.temperature} C out there.`,
          Precipitation: `There is ${response.body.current.precip} percent chance of rain.`,
    });
}
});
};
module.exports = forcast;