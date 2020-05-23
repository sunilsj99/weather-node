const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forcast = require('./utils/forcast.js')

const app = express()
const PORT = process.env.PORT || 3000

//define paths for express config
const public_path = path.join(__dirname, '../public')
const view_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

//setup handbars for express
app.set('view engine', 'hbs')
app.set('views', view_path)
hbs.registerPartials(partials_path)

//setup static directory
app.use(express.static(public_path))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Clima-Weather App',
        name: 'Sunil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is About page',
        name: 'Sunil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help page',
        message: 'We are here to help',
        name: 'Sunil'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            products: ['Error, No address is there !!']
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        place_name
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forcast(latitude, longitude, (error_w, data_w) => {

            if (error_w) {
                return res.send({
                    error: error_w
                })
            }

            res.send({
                forcast: data_w,
                place_name,
                address: req.query.address
            })

        })

    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 not found',
        message: 'help page does not exist',
        name: 'Sunil'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 not found',
        message: 'page does not exist',
        name: 'Sunil'
    })
})

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT + ' !!')
})