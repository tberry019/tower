import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";



export class CommentsController extends BaseController {
  constructor() {
    super('')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/api/comments', this.create)
      .get('/api/events/:eventId/comments', this.getByEventId)
      .delete('/api/comments/:commentId', this.remove)


  }
  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async getByEventId(req, res, next) {
    try {
      const comments = await commentsService.getByEventId(req.params.eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async remove(req, res, next) {
    try {
      await commentsService.remove(req.params.commentId, req.userInfo.id)
      return res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}