'use strict'
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
var express_1 = __importDefault(require('express'))
var cors_1 = __importDefault(require('cors'))
var App = /** @class */ (function () {
  function App () {
    this.server = express_1.default()
    this.middlewares()
  }
  App.prototype.middlewares = function () {
    this.server.use(cors_1.default())
    this.server.use(express_1.default.json())
  }
  return App
}())
exports.default = App
