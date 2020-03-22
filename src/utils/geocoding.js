const request = require('request')

const token = 'pk.eyJ1IjoicXVhbmdudG4wMzAyIiwiYSI6ImNrNnlmaGdhdDBzajUza284cTkybzZudzEifQ.2rsegrKUJjor5kTtQt_Rng'
const language = 'en'

// function geoMapAPI (keyword, callback) {
//   const mapBoxAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(keyword)}.json?access_token=${token}&language=${language}`
//   request(mapBoxAPI, { json: true }, (error, response) => {
//     if (error) {
//       return callback({ error: `Can't connect to server, try again` }, undefined)
//     } else if (response.body.features.length <= 0) {
//       return callback({ error: 'No result for your keyword, try again' }, undefined)
//     } else {
//       const placeData = []
//       const placeLat = []
//       const placeLng = []
//       let message = ''
//       const data = {
//         place: function () {
//           for (let i = 0; i < response.body.features.length; i++) {
//             placeData.push(response.body.features[i].place_name)
//           }
//         },
//         lat: function () {
//           for (let i = 0; i < response.body.features.length; i++) {
//             placeLat.push(response.body.features[i].geometry.coordinates[1])
//           }
//         },
//         lng: function () {
//           for (let i = 0; i < response.body.features.length; i++) {
//             placeLng.push(response.body.features[i].geometry.coordinates[0])
//           }
//         }
//       }
//       data.place()
//       data.lat()
//       data.lng()
//       for (let i = 0; i < placeData.length; i++) {
//         if (placeData[i].indexOf(keyword) === -1) {
//           message = 'No array data for your keyword, try again'
//         } else {
//           const data = {
//             place: placeData[i],
//             lat: placeLat[i],
//             lng: placeLng[i]
//           }
//           message = data
//           return callback(undefined, message)
//         }
//       }
//       return callback(undefined, message)
//     }
//   })
// }

// function geoMapData (keyword, callback) {
//   const mapBoxAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(keyword)}.json?access_token=${token}&language=${language}`
//   request(mapBoxAPI, { json: true }, (error, response) => {
//     if (error) {
//       return callback({ error: `Can't connect to server, try again` }, undefined)
//     } else if (response.body.features.length <= 0) {
//       return callback({ error: 'No result for your keyword, try again' }, undefined)
//     } else {
//       const placeData = []
//       const placeLat = []
//       const placeLng = []
//       let objectMap = []
//       const data = {
//         place: function () {
//           for (let i = 0; i < response.body.features.length; i++) {
//             placeData.push(response.body.features[i].place_name)
//           }
//         },
//         lat: function () {
//           for (let i = 0; i < response.body.features.length; i++) {
//             placeLat.push(response.body.features[i].geometry.coordinates[1])
//           }
//         },
//         lng: function () {
//           for (let i = 0; i < response.body.features.length; i++) {
//             placeLng.push(response.body.features[i].geometry.coordinates[0])
//           }
//         }
//       }
//       data.place()
//       data.lat()
//       data.lng()
//       for (let i = 0; i < placeData.length; i++) {
//         objectMap.push(placeData[i])
//       }
//       return callback(undefined, objectMap)
//     }
//   })
// }

function geoMapAPI (keyword, callback) {
  const mapBoxAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(keyword)}.json?access_token=${token}&language=${language}`
  request(mapBoxAPI, { json: true }, (error, response) => {
    if (error) {
      return callback({ error: `Can't connect to server, try again` }, undefined)
    } else if (response.body.features.length <= 0) {
      return callback({ error: 'No result for your keyword, try again' }, undefined)
    } else {
      const data = {
        place: response.body.features[0].place_name,
        lat: response.body.features[0].geometry.coordinates[1],
        lng: response.body.features[0].geometry.coordinates[0]
      }
      return callback(undefined, data)
    }
  })
}

function geoMapData (keyword, callback) {
  const mapBoxAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(keyword)}.json?access_token=${token}&language=${language}`
  request(mapBoxAPI, { json: true }, (error, response) => {
    if (error) {
      return callback({ error: `Can't connect to server, try again` }, undefined)
    } else if (response.body.features.length <= 0) {
      return callback({ error: 'No result for your keyword, try again' }, undefined)
    } else {
      const placeData = []
      const placeLat = []
      const placeLng = []
      let objectMap = []
      const data = {
        place: function () {
          for (let i = 0; i < response.body.features.length; i++) {
            placeData.push(response.body.features[i].place_name)
          }
        }
      }
      data.place()
      for (let i = 0; i < placeData.length; i++) {
        objectMap.push(placeData[i])
      }
      return callback(undefined, objectMap)
    }
  })
}

function getFullAPI (keyword, callback) {
  const mapBoxAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(keyword)}.json?access_token=${token}&language=${language}`
  request(mapBoxAPI, { json: true }, (error, response) => {
    if (error) {
      return callback({error: `Can't connect to server, try again`}, undefined)
    } else if (response.body.features.length <= 0) {
      return callback({ error: 'No result for your keyword, try again' }, undefined)
    } else {
      return callback(undefined, response.body)
    }
  })
}

module.exports = {
  geoMapAPI,
  geoMapData,
  getFullAPI
}
