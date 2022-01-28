import { dbContext } from "../db/DbContext";
import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"

class TowerEventsService {
  async create(newTowerEvent) {
    const towerEvent = await dbContext.TowerEvents.create(newTowerEvent)
    await towerEvent.populate('creator', 'name description')
    return towerEvent
  }

  async getAll(query = {}) {
    const TowerEvents = await dbContext.TowerEvents.find(query).populate
      ('creator', 'name description')

    return TowerEvents
  }

  async getById(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId).populate('creator', 'name description')
    if (!towerEvent) {
      throw new BadRequest('invalid towerEvent Id')
    }
    return towerEvent
  }

  async edit(edited, eventId) {
    const original = await dbContext.TowerEvents.findById(eventId)
    if (original.creatorId.toString() !== edited.creatorId) {
      throw new BadRequest('Cant edit this Event')
    }
    original.name = edited.name || original.name

  }
}

export const towerEventsService = new TowerEventsService