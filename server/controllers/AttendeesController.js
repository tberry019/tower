import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { attendeeService } from "../services/AttendeesService";

export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .delete('/:id', this.remove)


  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const attendee = await attendeeService.create(req.body)
      return res.send(attendee)
    } catch (error) {
      next(error)
    }
  }
  getAll(arg0, getAll) {
    throw new Error("Method not implemented.");
  }
  getById(arg0, getById) {
    throw new Error("Method not implemented.");
  }
  remove(arg0, remove) {
    throw new Error("Method not implemented.");
  }

}