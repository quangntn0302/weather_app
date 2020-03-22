const form = document.querySelector('form')
const input = document.getElementById('weather')
const textData = document.querySelectorAll('.data-text')
const parent = document.getElementById('navsuggest')
const parentNav = document.querySelector('.nav--suggest')
const button = document.querySelector('#button')
let placeText = document.querySelectorAll('.jsSuggest')
const resultContent = document.querySelector('#result__content')
const iconSummary = document.querySelector('.icon--summary')
const weekDay = document.querySelector('.week__day')
const weekContainer = document.querySelector('.week__container')

function checkForSpecialChar (string) {
  for (let i = 0; i < specialChars.length; i++) {
    if (string.indexOf(specialChars[i]) > -1) {
      return true
    }
  }
  return false
}

const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\/~`-='"
let term = 1

function removeVietnamese (str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
  str = str.replace(/Đ/g, 'D')
  return str
}

function handleString (string) {
  string = string.trim()
  let content = removeVietnamese(string)
  // string = slugify(string, { locale: 'vi' })
  content = content.toLowerCase()
  content = content.charAt(0).toUpperCase() + content.slice(1)
  return content
}

function chooseIconSummary (string) {
  const iconWeatherData = [
    'clear-day',
    'clear-night',
    'rain',
    'snow',
    'sleet',
    'wind',
    'fog',
    'cloudy',
    'partly-cloudy-day',
    'partly-cloudy-night',
    'hail',
    'thunderstorm',
    'tornado'
  ]
  switch (string) {
    case `${iconWeatherData[0]}`: iconSummary.classList.add('fas'); iconSummary.classList.add('fa-clouds-sun'); break
    case `${iconWeatherData[1]}`: iconSummary.classList.add('fad'); iconSummary.classList.add('fa-clouds-moon'); break
    case `${iconWeatherData[2]}`: iconSummary.classList.add('fad'); iconSummary.classList.add('fa-cloud-rain'); break
    case `${iconWeatherData[3]}`: iconSummary.classList.add('fas'); iconSummary.classList.add('fa-cloud-snow'); break
    case `${iconWeatherData[4]}`: iconSummary.classList.add('fad'); iconSummary.classList.add('fa-cloud-sleet'); break
    case `${iconWeatherData[5]}`: iconSummary.classList.add('fad'); iconSummary.classList.add('fa-snow-blowing'); break
    case `${iconWeatherData[6]}`: iconSummary.classList.add('fas'); iconSummary.classList.add('fa-fog'); break
    case `${iconWeatherData[7]}`: iconSummary.classList.add('fas'); iconSummary.classList.add('fa-clouds'); break
    case `${iconWeatherData[8]}`: iconSummary.classList.add('fas'); iconSummary.classList.add('fa-sun-cloud'); break
    case `${iconWeatherData[9]}`: iconSummary.classList.add('fad'); iconSummary.classList.add('fa-clouds-moon'); break
    case `${iconWeatherData[10]}`: iconSummary.classList.add('fas'); iconSummary.classList.add('fa-cloud-hail'); break
    case `${iconWeatherData[11]}`: iconSummary.classList.add('fas'); iconSummary.classList.add('fa-thunderstorm'); break
    case `${iconWeatherData[12]}`: iconSummary.classList.add('fas'); iconSummary.classList.add('fa-tornado'); break
    default:
      console.log('khong co du lieu')
  }
}

function returnIconWeatherDependOnIconReceive (string) {
  const iconWeatherData = [
    'clear-day',
    'clear-night',
    'rain',
    'snow',
    'sleet',
    'wind',
    'fog',
    'cloudy',
    'partly-cloudy-day',
    'partly-cloudy-night',
    'hail',
    'thunderstorm',
    'tornado'
  ]
  let icon
  if (string === iconWeatherData[0]) {
    icon = '<i class="fas fa-clouds-sun icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[1]) {
    icon = '<i class="fad fa-clouds-moon icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[2]) {
    icon = '<i class="fad fa-cloud-rain icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[3]) {
    icon = '<i class="fas fa-cloud-snow icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[4]) {
    icon = '<i class="fad fa-cloud-sleet icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[5]) {
    icon = '<i class="fad fa-snow-blowing icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[6]) {
    icon = '<i class="fas fa-fog icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[7]) {
    icon = '<i class="fas fa-clouds icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[8]) {
    icon = '<i class="fas fa-sun-cloud icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[9]) {
    icon = '<i class="fad fa-clouds-moon icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[10]) {
    icon = '<i class="fas fa-cloud-hail icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[11]) {
    icon = '<i class="fas fa-thunderstorm icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[12]) {
    icon = '<i class="fas fa-tornado icon--detail"></i>'
    return icon
  }
}

function returnIconFaceDependOnIconReceive (string) {
  const iconWeatherData = [
    'clear-day',
    'clear-night',
    'rain',
    'snow',
    'sleet',
    'wind',
    'fog',
    'cloudy',
    'partly-cloudy-day',
    'partly-cloudy-night',
    'hail',
    'thunderstorm',
    'tornado'
  ]
  let icon
  if (string === iconWeatherData[0]) {
    icon = '<i class="fad fa-smile-beam icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[1]) {
    icon = '<i class="fad fa-grin-hearts icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[2]) {
    icon = '<i class="fad fa-sad-tear icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[3]) {
    icon = '<i class="fad fa-grin-tears icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[4]) {
    icon = '<i class="fad fa-grin-squint-tears icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[5]) {
    icon = '<i class="fad fa-grin-stars icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[6]) {
    icon = '<i class="fad fa-grin-hearts icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[7]) {
    icon = '<i class="fad fa-kiss-wink-heart icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[8]) {
    icon = '<i class="fad fa-kiss-beam icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[9]) {
    icon = '<i class="fad fa-grin-tongue-squint icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[10]) {
    icon = '<i class="fad fa-meh-blank icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[11]) {
    icon = '<i class="fad fa-dizzy icon--detail"></i>'
    return icon
  }
  if (string === iconWeatherData[12]) {
    icon = '<i class="fad fa-grimace icon--detail"></i>'
    return icon
  }
}

function convertTimeStamp (string) {
  const monthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const date = new Date(string * 1000)
  const year = date.getFullYear()
  const month = monthsArray[date.getMonth()]
  const day = date.getDate()
  const convertDataTime = `${month}-${day}, ${year}`
  return convertDataTime
}

function fetchDataPredictWeek (dataInput) {
  fetch(`/api/weather/week?search=${dataInput}`).then(res => {
    return res.json()
  }).then(data => {
    if (data.error) {
      console.log(data.error)
    } else {
      for (let i = 0; i < 7; i++) {
        let newElement = document.createElement('div')
        let mapElement = `<div class="date__week">
                              <p class="text--detail">${returnIconFaceDependOnIconReceive(data.iconSend[i])}${convertTimeStamp(data.timeSend[i])}</p>
                              <div class="date__detail">
                                <div class="detail--detail">
                                ${returnIconWeatherDependOnIconReceive(data.iconSend[i])}
                                </div>
                                <div class="detail--detail">
                                  <span class="span-2"><i class="far fa-thermometer-full icon--detail"></i>${data.temperatureHighSend[i]}</span>
                                  <span class="span-2"><i class="fal fa-thermometer-empty icon--detail"></i>${data.temperatureLowSend[i]}</span>
                                </div>
                                <div class="detail--detail">
                                  <span><i class="fal fa-wind icon--detail"></i>${data.windSpeedSend[i]}</span>
                                  <span class="span-2"><i class="fad fa-humidity icon--detail"></i>${data.humiditySend[i]}</span>
                                </div> 
                              </div>
                              <div class="date__summary">
                                <p><i class="fal fa-poll icon--detail"></i>${data.summarySend[i]}</p>
                              </div>
                          </div>`
        newElement.innerHTML = mapElement
        weekDay.appendChild(newElement)
      }
    }
  }).catch(error => {
    console.log(error)
  })
}

button.addEventListener('click', event => {
  event.preventDefault()
  if (checkForSpecialChar(input.value)) {
    alert('special characters')
  } else {
    parentNav.style.display = 'none'
    resultContent.style.display = 'block'
    iconSummary.className = 'icon--summary'
    for (let i = 0; i < textData.length; i++) {
      textData[i].innerHTML = 'loading ...'
    }
    if (input.value === '') {
      for (let i = 0; i < textData.length; i++) {
        textData[i].innerHTML = 'error'
      }
    }
    fetch(`/api/weather?search=${input.value}`).then(res => {
      return res.json()
    }).then(data => {
      if (data.error) {
        for (let i = 0; i < textData.length; i++) {
          textData[i].innerHTML = data.error
        }
      } else {
        const dataReceive = [
          data.placeResponse,
          data.tempertureResponse,
          data.humidityResponse,
          data.windSpeedResponse,
          data.summaryResponse
        ]
        input.value = ''
        for (let i = 0; i < textData.length; i++) {
          textData[i].innerHTML = dataReceive[i]
        }
        const dataIconReceive = {
          iconReceive: data.iconResponse
        }
        chooseIconSummary(dataIconReceive.iconReceive)
        weekContainer.style.display = 'block'
      }
    }).catch(_error => {
      parentNav.style.display = 'none'
      if (input.value === '') {
        for (let i = 0; i < textData.length; i++) {
          textData[i].innerHTML = 'place?'
        }
      }
      for (let i = 0; i < textData.length; i++) {
        textData[i].innerHTML = 'fetch error'
      }
    })
    fetchDataPredictWeek(input.value)
  }
})

form.addEventListener('submit', event => {
  event.preventDefault()
  if (checkForSpecialChar(input.value)) {
    alert('special characters')
  } else {
    iconSummary.className = 'icon--summary'
    parentNav.style.display = 'none'
    resultContent.style.display = 'block'
    for (let i = 0; i < textData.length; i++) {
      textData[i].innerHTML = 'loading ...'
    }
    if (input.value === '') {
      for (let i = 0; i < textData.length; i++) {
        textData[i].innerHTML = 'error'
      }
    }
    fetch(`/api/weather?search=${input.value}`).then(res => {
      return res.json()
    }).then(data => {
      if (data.error) {
        for (let i = 0; i < textData.length; i++) {
          textData[i].innerHTML = data.error
        }
      } else {
        const dataReceive = [
          data.placeResponse,
          data.tempertureResponse,
          data.tempertureResponse,
          data.windSpeedResponse,
          data.summaryResponse
        ]
        input.value = ''
        for (let i = 0; i < textData.length; i++) {
          textData[i].innerHTML = dataReceive[i]
        }
        const dataIconReceive = {
          iconReceive: data.iconResponse
        }
        chooseIconSummary(dataIconReceive.iconReceive)
        weekContainer.style.display = 'block'
      }
    }).catch(_error => {
      parentNav.style.display = 'none'
      if (input.value === '') {
        for (let i = 0; i < textData.length; i++) {
          textData[i].innerHTML = 'place?'
        }
      }
      for (let i = 0; i < textData.length; i++) {
        textData[i].innerHTML = 'fetch error'
      }
    })
    fetchDataPredictWeek(input.value)
  }
})

input.addEventListener('keyup', (event) => {
  event.preventDefault()
  if (event.keyCode === 13) {
    parentNav.style.display = 'none'
    resultContent.style.display = 'block'
    weekContainer.style.display = 'none'
  } else {
    parentNav.style.display = 'block'
    resultContent.style.display = 'none'
    weekContainer.style.display = 'none'
    iconSummary.className = 'icon--summary'
    fetch(`/api/place?search=${handleString(input.value)}`).then(res => {
      return res.json()
    }).then(data => {
      if (data.error) {
        return para_1.innerHTML = data.error
      }
      const dataArray = data
      if (term === 0 || input.value.length <= 0) {
        while (parent.hasChildNodes()) {
          parent.removeChild(parent.firstChild)
        }
        while (weekDay.hasChildNodes()) {
          weekDay.removeChild(weekDay.firstChild)
        }
        term = 1
        // para_1.innerHTML = ''
        parentNav.style.display = 'none'
        weekContainer.style.display = 'none'
      }
      if (term === 1 && input.value.length > 0) {
        for (let i = 0; i < dataArray.length; i++) {
          let newElement = document.createElement('li')
          let mapArray = `<a href="#" class="btn btn--suggest jsSuggest" onclick="addEvent(${i})"><i class="fad fa-map-marker-alt icon icon--nav"></i>${dataArray[i]}</a>`
          newElement.innerHTML = mapArray
          parent.appendChild(newElement)
          placeText = document.querySelectorAll('.jsSuggest')
        }
        term = 0
        // para_1.innerHTML = ''
        parentNav.style.display = 'block'
      }
    }).catch(_error => {
      parentNav.style.display = 'none'
    })
  }
})

function addEvent (number) {
  // console.log(event.target.textContent)
  input.value = placeText[number].textContent
}
