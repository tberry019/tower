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

  async edit(edited, towerEventId) {
    const original = await dbContext.TowerEvents.findById(towerEventId)
    if (original.creatorId.toString() !== edited.creatorId) {
      throw new BadRequest('Cant edit this Event')
    }
    original.name = edited.name || original.name
    original.description = edited.description || original.description
    original.coverImg = edited.coverImg || original.coverImg
    original.location = edited.location || original.location
    original.capacity = edited.capacity || original.capacity
    original.startDate = edited.startDate || original.startDate
    original.isCancelled = edited.isCancelled || original.isCancelled
    original.type = edited.type || original.type

    await original.save()
    return original
  }

  async remove(id, userId) {
    const original = await this.getById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('could not remove event.')
    }
    await original.remove()
    return original
  }

}

export const towerEventsService = new TowerEventsService