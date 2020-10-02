//This script is client side

console.log("Client side javascript file loaded")



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent ='loading...'
    messageTwo.textContent =''
    fetch('http://localhost:3000/weather?address='+ location).then((response) =>{

    response.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error
        }
            messageOne.textContent = ''
            messageTwo.innerHTML =
                'Address: ' + data.address + '<br><br>' +
                'Temperature: ' + data.temperature + '°C<br><br>' +
                'Feels like: ' + data.feelslike + '°C'
        })
    })
})