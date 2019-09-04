const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6eac5c0f0c2c196c2f2b626299b2db89/' + latitude + ',' + longitude

    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if (body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + 'degree out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
