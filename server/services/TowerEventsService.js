import { dbContext } from "../db/DbContext";

class TowerEventsService {
  async create(newTowerEvent) {
    const towerEvent = await dbContext.TowerEvents.create(newTowerEvent)
    await towerEvent.populate('creator', 'name description')
    return towerEvent
  }
}

export const towerEventsService = new TowerEventsService