const request = require('request-promise');

const API_KEY = '224f2b398d2f661c648802d6b12f49';

class Weather {
    static retrieveByCity(city, callback){
        let fullUri = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY;
        request({
            uri: fullUri,
            json: true
        }).then(function (res) {
           callback(res);
        }).catch(function (err) {
            console.log(err);
            callback({error: err});
        });
    }
}

module.exports = Weather;
