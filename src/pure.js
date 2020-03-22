const http = require('http')

const app = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/') {
    response.end('Home page')
  }
})

app.listen(3300)
