const http = require('http')
const url = require('url')
const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query
  console.log(query)
  res.write(`${query.callback}('hello')`)
  res.end()
}).listen(3000)
