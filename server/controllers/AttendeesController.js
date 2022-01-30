import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";


export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)


  }

}