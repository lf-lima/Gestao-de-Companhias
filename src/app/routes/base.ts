import { Router } from 'express'

export default class BaseRouter {
  public router = Router()
  public route: string

  constructor (route: string) {
    this.route = route
  }
}
