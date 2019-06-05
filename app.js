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
        },
        r: {
            demand: false,
            alias: 'reportType',
            describe: 'Choose how much info from the report to get back',
            default: 'f',
            string: true
        }
})
    .help()
    .alias('help', 'h')
    .argv;


geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    } else {
        console.log(`
        Location: ${results.address}`)
        weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            } else{
                let temp;
                let appTemp;
                let tempKind;
                const windResults = `\tWind Speed: ${weatherResults.windSpeed}\n\tWind Gust: ${weatherResults.windGust}\n\tWind Bearing: ${weatherResults.windBearing}`;
                
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

                const tempResults = `\tTemperature: ${temp}°${tempKind}\n\tApparent Temperature: ${appTemp}°${tempKind}`;

                switch(argv.r.toLowerCase()){
                    case 'f':
                    case 'full':
                        console.log(
                            `\tSummary: ${weatherResults.summary}\n${tempResults}\n\tPrecipitation: ${weatherResults.precipType}\n${windResults}\n\tPressure: ${weatherResults.pressure}
                            `)
                        break;
                    case 't':
                    case 'temp':
                    case 'temperature':
                        console.log(`${tempResults}`);
                        break;
                    case 'w':
                    case 'wind':
                        console.log(`${windResults}`);
                        break;
                }
            }
        });
    }
});
