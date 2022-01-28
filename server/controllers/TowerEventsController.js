import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";


export class TowerEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('', this.getAll)
      .get('/:id', this.getById)
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
  getAll(arg0, getAll) {
    throw new Error("Method not implemented.");
  }
  getById(arg0, getById) {
    throw new Error("Method not implemented.");
  }
  edit(arg0, edit) {
    throw new Error("Method not implemented.");
  }
  remove(arg0, remove) {
    throw new Error("Method not implemented.");
  }

}