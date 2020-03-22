const express = require('express')
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')

const geocoding = require('./utils/geocoding')
const darksky = require('./utils/darksky')
const publicDirectory = path.join(__dirname, '../public')
const viewDirectory = path.join(__dirname, '../public/template')
const partialsDirectory = path.join(__dirname, '../public/template/partials')

const app = express()

hbs.registerPartials(partialsDirectory)
app.use(express.static(publicDirectory))
const urlencodedParser = bodyParser.urlencoded({ extended: false })
// request => middleware funtion => response funtion => response

app.set('view engine', 'hbs')
app.set('views', viewDirectory)

app.get('/', (request, response) => {
  // response.sendFile(publicDirectory + '/index.html')
  const data = {
    title: 'home',
    main: 'home page',
    user: 'quang'
  }
  response.render('index', data)
})

app.get('/help', (request, response) => {
  const data = {
    title: 'help',
    main: 'help page',
    user: 'quang'
  }
  response.render('help', data)
})

app.get('/help/*', (request, response) => {
  response.send('404 for help page')
})

app.get('/about', (request, response) => {
  const data = {
    title: 'about',
    main: 'about page',
    user: 'quang'
  }
  response.render('about', data)
})

app.get('/about/*', (request, response) => {
  response.send('404 for about page')
})

app.get('/weather', (request, response) => {
  const data = {
    title: 'weather',
    main: 'weather client-side render',
    user: 'quang'
  }
  response.render('weather', data)
})

app.get('/weather/*', (request, response) => {
  response.send('404 for weather page')
})

app.get('/product', (request, response) => {
  console.log(request.query)
  response.send('product')
})

app.get('/autocomplete', (request, response) => {
  const data = {
    title: 'weather',
    main: 'weather sever-side render',
    user: 'quang'
  }
  response.render('autocomplete', data)
})

app.get('/display', (request, response) => {
  if (!request.query) {
    return response.send('Input query string')
  } else {
    const { lat, lng } = request.query
    darksky.getWeather(lat, lng, (error, data) => {
      if (error) {
        response.send(error)
      } else {
        const dataReceive = {
          place: request.query.place_name,
          temperature: data.currently.temperature,
          summary: data.currently.summary
        }
        response.render('display', { dataReceive })
      }
    })
  }
})

app.post('/result', urlencodedParser, (request, response) => {
  const { search } = request.body
  if (!search) {
    return response.send('Input body string')
  } else {
    geocoding.getFullAPI(search, (error, responseData) => {
      if (error) {
        console.log(error)
      } else {
        const newData = responseData.features.map(feature => {
          return {
            place: feature.place_name,
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0]
          }
        })
        response.render('result', { newData })
      }
    })
  }
})

app.get('/api/place', (request, response) => {
  if (!request.query.search) {
    return response.send('Input query string')
  } else {
    const { search } = request.query
    geocoding.geoMapData(search, (error, responseAPI) => {
      if (error) {
        response.send(error)
      } else {
        response.send(responseAPI)
      }
    })
  }
})

app.get('/api/weather', (request, response) => {
  if (!request.query.search) {
    return response.send('Input query string')
  } else {
    const { search } = request.query
    geocoding.geoMapAPI(search, (error, responseAPI) => {
      if (error) {
        response.send(error)
      } else {
        const dataMap = {
          placeData: responseAPI.place,
          latData: responseAPI.lat,
          lngData: responseAPI.lng
        }
        darksky.getWeather(dataMap.latData, dataMap.lngData, (error, responseWeather) => {
          if (error) {
            response.send(error)
          } else {
            const dataResponse = {
              placeResponse: dataMap.placeData,
              latResponse: dataMap.latData,
              lngResponse: dataMap.lngData,
              tempertureResponse: responseWeather.currently.temperature,
              windSpeedResponse: responseWeather.currently.windSpeed,
              summaryResponse: responseWeather.currently.summary,
              iconResponse: responseWeather.currently.icon,
              humidityResponse: responseWeather.currently.humidity
            }
            response.send(dataResponse)
          }
        })
      }
    })
  }
})

app.get('/api/weather/week', (request, response) => {
  if (!request.query.search) {
    return response.send('Input query string')
  } else {
    const { search } = request.query
    geocoding.geoMapAPI(search, (error, responseAPI) => {
      if (error) {
        response.send(error)
      } else {
        const dataMap = {
          placeData: responseAPI.place,
          latData: responseAPI.lat,
          lngData: responseAPI.lng
        }
        darksky.getWeatherWeek(dataMap.latData, dataMap.lngData, (error, responseWeatherWeek) => {
          if (error) {
            response.send(error)
          } else {
            response.send(responseWeatherWeek)
          }
        })
      }
    })
  }
})

// geocoding.geoMapAPI('Los_Angeles', (error, responseAPI) => {
//   if (error) {
//     console.log(error)
//   } else {
//     const dataMap = {
//       placeData: responseAPI.place,
//       latData: responseAPI.lat,
//       lngData: responseAPI.lng
//     }
//     darksky.getWeatherWeek(dataMap.latData, dataMap.lngData, (error, responseWeatherWeek) => {
//       if (error) {
//         console.log(error)
//       } else {
//         console.log(responseWeatherWeek)
//       }
//     })
//   }
// })

app.get('/*', (request, response) => {
  response.send('404 error')
})

app.listen(process.env.PORT || 3300)
