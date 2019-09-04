const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Cristian Wijaya'
    })
})

app.get('/about', (req, res) => {
    res. render('about', {
        title: 'It is About The App',
        name: 'Cristian Wijaya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
       helpText: 'This is some helpful text',
       title: 'Help Page',
       name: 'Cristian Wijaya'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Cristian Wijaya',
        errorMessage: 'Help article not Found'
    })
})

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Cristian Wijaya',
//         errorMessage: 'Page not Found'
//     })
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res. send({
            error: 'You must provide an address...'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})  => {
        if (error) {
            return res.send({error: error})
        }
        forecast(latitude, longitude, (error, forecasData) => {
            if (error) {
                return res.send ({error})
            }
            res.send({
                forecast: forecasData,
                location,
                address: req.query.address
            })
        })
    })


 })


app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})


app.listen(4000, () => {
    console.log('Server ini berjalan di port 4000');
})






// Cara menjalankan di terminal => nodemon app.js 
// Atau dengan cara => nodemon app.js -e js.hbs