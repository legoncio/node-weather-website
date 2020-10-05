//This script is client side

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

const getWeather = (url) =>{
    fetch(url).then((response) =>{
        response.json().then((data) => {
            if (data.error) {
                return messageTwo.textContent = data.error
            }
                messageOne.textContent = ''
                messageTwo.innerHTML =
                    'Current weather for ' + data.address + '<br><br>' +
                    'The temperature is ' + data.temperature + '°C ' +
                    'and it feels like ' + data.feelslike + '°C.<br><br>' +
                    'The current humidity is ' + data.humidity +'% <br><br>' +
                    'Information observed at ' + data.time + ' local time.'
            })
        })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent ='loading...'
    messageTwo.textContent =''
    if(e.submitter.id === 'manual-search'){
        const location = searchElement.value
        getWeather('/weather?address=' + location)
    }else if (e.submitter.id === 'local-search'){
        if(window.navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition((success, error) =>{
                if(error) {
                    messageOne.textContent = 'Error getting your location, try manual search'
                }else{
                    const lat = success.coords.latitude
                    const long = success.coords.longitude
                    getWeather('/weatherLocal?lat=' + lat + '&long=' + long)
                }
            })
        }      
    }
})