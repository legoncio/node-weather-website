const { get } = require('request')
const request = require('request')

const getWeather = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5fb3329b19f4b4c9b546c0f7289db001&query=' + latitude + ',' + longitude
    
    request({ url, json: true}, (error, { body } = {}) =>{
        if (error) {
            callback('Unable to reach the weather information services', undefined)
        }else if (body.error){
            callback('Unable to fetch weather: no valid location provided', undefined)
        }else{
            const { location, current } = body
            callback(undefined, {
                temperature: current.temperature,
                feelsLike: current.feelslike,
                humidity: current.humidity,
                time: location.localtime
            })
        }
    })
}

module.exports = getWeather