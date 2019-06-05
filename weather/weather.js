const request = require('request');

var convertToC = (temp) => {
    return (((temp - 32)*5 )/9).toFixed(2);
}
var getWeather = (lat, lng, callback) => {
    request({
    url: `https://api.darksky.net/forecast/74b2dae0a3dff060e64767cc1d7f2b64/${lat},${lng}`,
    json: true

},(error, response, body) => {
    if(!error && response.statusCode===200){
        callback(undefined, {
            temperatureF: body.currently.temperature,
            apparentTemperatureF: body.currently.apparentTemperature,
            temperatureC: convertToC(body.currently.temperature),
            apparentTemperatureC: convertToC(body.currently.apparentTemperature)
        });
    }
    else {
        callback('Unable to fetch weather');}
})
}

module.exports.getWeather = getWeather;
