const request = require('request');

var key = //key
var convertToC = (temp) => {
    return (((temp - 32)*5 )/9).toFixed(2);
}
var getWeather = (lat, lng, callback) => {
    request({
    url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
    json: true

},(error, response, body) => {
    if(!error && response.statusCode===200){
        callback(undefined, {
            temperatureF: body.currently.temperature,
            apparentTemperatureF: body.currently.apparentTemperature,
            temperatureC: convertToC(body.currently.temperature),
            apparentTemperatureC: convertToC(body.currently.apparentTemperature),
            summary: body.currently.summary,
            precipType: body.currently.precipType,
            pressure: body.currently.pressure,
            windSpeed: body.currently.windSpeed,
            windGust: body.currently.windGust,
            windBearing: body.currently.windBearing


        });
    }
    else {
        callback('Unable to fetch weather');}
})
}

module.exports.getWeather = getWeather;
