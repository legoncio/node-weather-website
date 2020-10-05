//This script is client side

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent ='loading...'
    messageTwo.textContent =''
    fetch('/weather?address='+ location).then((response) =>{

    response.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error
        }
            messageOne.textContent = ''
            messageTwo.innerHTML =
                'Current weather for ' + data.address + '<br><br>' +
                'The temperature is ' + data.temperature + '°C ' +
                'and it feels like ' + data.feelslike + '°C.<br><br>' +
                'The current humidity is ' + data.humidity +' g/m3 <br><br>' +
                'Information observed at ' + data.time + ' local time.'
        })
    })
})