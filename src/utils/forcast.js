const request = require('request')

const forcast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=debd7c600d45941df1be483bbb8cb573&query=" + lat + "," + long + "&units=m"
    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service..!!", undefined)
        } else if (response.body.error) {
            callback("Unable to find the location..!!", undefined)
        } else {
            callback(undefined, {
                type: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                rain_chance: response.body.current.precip
            })
        }
    })
}

module.exports = forcast