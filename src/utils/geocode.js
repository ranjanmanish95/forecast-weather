const request = require('postman-request');

const geocode = function(address, callback)
{
let geocoding ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoicmFuamFubWFuaXNoOTUiLCJhIjoiY2trNXU2Nm41MGZ5dzJ1bnRxbG9rZ25qYiJ9.yzWxRDMLUn7uhZKDoLSvCA&limit=1';

request({url:geocoding , json: true}, function(error,response)
{
    if(error)
    {
        callback('Unable to connect to API services. Check your internet connection',undefined);
    }
    else if(response.body.features.length ===0)
    {
        callback('Unable to get the location coordinates. Please try for another one',undefined);
    }
    else{
        callback(undefined, {
           latitude : response.body.features[0].center[1],
            longitude : response.body.features[0].center[0],
            Address: response.body.features[0].place_name, 

        })
    }
});
}

module.exports = geocode;

