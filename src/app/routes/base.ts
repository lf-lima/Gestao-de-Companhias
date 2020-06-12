import { Router } from 'express'

export class BaseRouter {
  public router = Router()
  public route: string
  constructor (route: string) {
    this.route = route
  }
}
