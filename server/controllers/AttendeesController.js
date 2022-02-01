import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { attendeesService } from "../services/AttendeesService";

export class AttendeesController extends BaseController {
  constructor() {
    super('api/attendees')
    this.router
      // TODO move below route into the events controller, and call the attendees service
      .get('/api/events/:eventId/attendees', this.getByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      // TODO move the below route to the accounts controller, and call to the attendees service
      .get('/account/attendees', this.getAll)
      .post('', this.create)
      .delete('/:id', this.remove)


  }
  async create(req, res, next) {
    try {

      req.body.accountId = req.userInfo.id
      const attendee = await attendeesService.create(req.body)
      return res.send(attendee)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      req.query.accountId = req.userInfo.id
      const attendance = await attendeesService.getAll(req.query)
      return res.send(attendance)
    } catch (error) {
      next(error)
    }
  }
  async getByEventId(req, res, next) {
    try {
      const attendees = await attendeesService.getByEventId(req.params.eventId)
      return res.send(attendees)
    } catch (error) {
      next(error)
    }

  }
  async remove(req, res, next) {
    try {
      await attendeesService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }

}