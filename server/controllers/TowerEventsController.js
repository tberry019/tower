import { Auth0Provider } from "@bcwdev/auth0provider";
import { attendeesService } from "../services/AttendeesService";
import { commentsService } from "../services/CommentsService";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";


export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      // .get('/:eventId/attendees', )
      .get('/:id/comments', this.getCommentsByEvent)
      .get('/:eventId/attendees', this.getByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:eventId', this.edit)
      .delete('/:id', this.remove)
  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.create(req.body)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      // req.query.creatorId = req.userInfo.id
      const towerEvents = await towerEventsService.getAll()
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEvent(req, res, next) {
    try {
      // CALL THE COMMENTS SERVICE AND PASS THE EVENT ID

      let eventComments = await commentsService.getByEventId(req.params.id)
      res.send(eventComments)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const towerEvent = await towerEventsService.getById(req.params.id)
      return res.send(towerEvent)
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

  async edit(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.eventId = req.params.eventId
      const updated = await towerEventsService.edit(req.body, req.params.eventId)
      return res.send(updated)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      await towerEventsService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }

}