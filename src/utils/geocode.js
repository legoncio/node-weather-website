const request = require('request')

const makeRequest = (url, callback) =>{
    request({ url: url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to reach geocoding services', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location', undefined)
        }else{
            const { features } = body
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                placeName: features[0].place_name
            })
        }
    })
}
const geocodeAddress = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGVnb25jaW8iLCJhIjoiY2tmZnd1bnBvMDRlZjJxbzR0amRkNmczMiJ9.K-MI2E5Z58KJ4c9lSwuycA'
    makeRequest(url, (error, result) =>{
        callback(error, result)
    })
}

const geocodeCoords = (lat, long, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + long +','+ lat + '.json?access_token=pk.eyJ1IjoibGVnb25jaW8iLCJhIjoiY2tmZnd1bnBvMDRlZjJxbzR0amRkNmczMiJ9.K-MI2E5Z58KJ4c9lSwuycA'
    makeRequest(url, (error, result) =>{
        callback(error, result)
    })
}

module.exports = {
    geocodeAddress,
    geocodeCoords
}