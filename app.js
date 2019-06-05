const yargs = require('yargs');

const weather = require('./weather/weather');
const geocode = require('./geocode/geocode')
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        },
        t: {
            demand: false,
            alias: 'temperature',
            describe: 'Choose temperature between F and C',
            string: true,
            default: 'c'
        }
})
    .help()
    .alias('help', 'h')
    .argv;


geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    } else {
        console.log(`Location: ${results.address}`)
        weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            } else{
                let temp;
                let appTemp;
                let tempKind;
                switch(argv.t.toLowerCase()){
                    case 'c':
                    case 'celcius':
                        temp = weatherResults.temperatureC;
                        appTemp=weatherResults.apparentTemperatureC;
                        tempKind='C'
                        break;
                    case 'f':
                    case 'fahrenheit':
                        temp = weatherResults.temperatureF;
                        appTemp=weatherResults.apparentTemperatureF;
                        tempKind='F'
                        break;

                    }
                console.log(`It is currently ${temp} °${tempKind}, but feels like ${appTemp} °${tempKind}.`);
            }
        });
    }
});
