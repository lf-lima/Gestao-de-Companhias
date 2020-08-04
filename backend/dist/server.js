'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
var app_1 = __importDefault(require('./app'))
var server = new app_1.default().server
var port = 3333
server.listen(port, function () {
  console.log('SERVER ON')
  console.log('Listen in http://localhost:' + port)
})
