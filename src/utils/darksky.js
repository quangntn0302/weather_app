const request = require('request')

const darkSkyAPI = '57ed2cb69e48bf1dbe132c1943226b8a'

const language = 'en'

function getWeather (lat, lng, callback) {
  const darkSkyURL = `https://api.darksky.net/forecast/${darkSkyAPI}/${lat},${lng}?lang=${language}`
  request(darkSkyURL, { json: true }, (error, response) => {
    if (error) {
      return callback({ error: 'Can\'t connect to server, try again' }, undefined)
    } else if (response.body.error) {
      return callback({ error: 'No result for your keyword' }, undefined)
    } else {
      return callback(undefined, response.body)
    }
  })
}

function getWeatherWeek (lat, lng, callback) {
  const darkSkyURL = `https://api.darksky.net/forecast/${darkSkyAPI}/${lat},${lng}?lang=${language}`
  request(darkSkyURL, { json: true }, (error, response) => {
    if (error) {
      return callback({ error: 'Can\'t connect to server, try again' }, undefined)
    } else if (response.body.error) {
      return callback({ error: 'No result for your keyword' }, undefined)
    } else {
      const timeWeek = []
      const iconWeek = []
      const temperatureHighWeek = []
      const temperatureLowWeek = []
      const humidityWeek = []
      const windSpeedWeek = []
      const summaryWeek = []
      for (let i = 0; i < response.body.daily.data.length; i++) {
        timeWeek.push(response.body.daily.data[i].time)
        iconWeek.push(response.body.daily.data[i].icon)
        temperatureHighWeek.push(response.body.daily.data[i].temperatureHigh)     
        temperatureLowWeek.push(response.body.daily.data[i].temperatureLow)
        windSpeedWeek.push(response.body.daily.data[i].windSpeed)
        humidityWeek.push(response.body.daily.data[i].humidity)
        summaryWeek.push(response.body.daily.data[i].summary)
      }
      const dataSend = {
        timeSend: timeWeek,
        iconSend: iconWeek,
        temperatureHighSend: temperatureHighWeek,
        temperatureLowSend: temperatureLowWeek,
        windSpeedSend: windSpeedWeek,
        humiditySend: humidityWeek,
        summarySend: summaryWeek
      }
      return callback(undefined, dataSend)
    }
  })
}

module.exports = {
  getWeather,
  getWeatherWeek
}
