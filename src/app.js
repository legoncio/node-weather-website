const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//process.env.PORT is the port assigend by heroku
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Leon'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About page',
        name: 'Leon'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help page',
        name: 'Leon'
    })
})

app.get('/weather', (req, res) =>{
    location = req.query.address
    if(!location) {
        return res.send({
            error: 'No address provided. Please provide one'
        })
    }

    geocode(location, (error, { latitude, longitude, placeName } = {}) => { //Default value for object if error is an empty object
        if(error){
            return res.send({
                address: location,
                error: 'Unable to geocode the address provided'
            })
        }
        
        weather(latitude, longitude, (error, {temperature, feelsLike, humidity, time} = {}) =>{
            if(error){
                return res.send({
                    address: req.query.address,
                    error: 'Unable to find weather data for the address provided'
                })
            }
            res.send({
                address: placeName,
                temperature: temperature,
                feelslike: feelsLike,
                humidity: humidity,
                time: time
            })
        })
    })    
})

app.get('/products', (req, res) =>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404', {
        title: '404 - Help section',
        name: 'Leon',
        message: 'Help article not found'
    })
})
app.get('*', (req, res) =>{
    res.render('404', {
        title: '404 error',
        name: 'Leon',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})