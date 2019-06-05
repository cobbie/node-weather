const request = require('request');

var key = //key
var geocodeAddress = (address, callback) => {
    const addressURI = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressURI}&key=${key}`;
    
    // machine error vs server error
    request({
        url: url,
        json: true
    },(error, response, body) => {
        if(error){
            callback('Unable to connect to Google Servers');
        } else if(body.status==="ZERO_RESULTS"){
            callback('Unable to find address');
        } else if(body.status==="OK"){
            callback(undefined, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            });
        }
    })
}

module.exports = {
    geocodeAddress
}