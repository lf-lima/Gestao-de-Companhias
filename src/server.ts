import App from './app'

const server = App.server

const port = 3333

server.listen(port, () => {
  console.log('SERVER ON')
  console.log(`Listen in http://localhost:${port}`)
})
