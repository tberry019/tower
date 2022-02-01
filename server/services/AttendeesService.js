import { dbContext } from "../db/DbContext";
import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"


class AttendeesService {

  async create(newAttendee) {
    const foundEvent = await this.getByEventId(newAttendee.eventId)

    // @ts-ignore
    if (foundEvent.capacity <= 0) {

      throw new BadRequest('event is full')
    }

    const attendee = await dbContext.Attendees.create(newAttendee)
    // @ts-ignore
    foundEvent.capacity -= 1




    // @ts-ignore
    await foundEvent.save()
    await attendee.populate('account', 'name description')
    return attendee

  }
  async getAll(query = {}) {
    const attendance = await dbContext.Attendees.find(query).populate('event')
    return attendance
  }

  async getByEventId(eventId) {
    const attendees = await dbContext.Attendees.find({ eventId: eventId }).populate('account')
    if (!attendees) {
      throw new BadRequest('Invalid Event Id')

    }
    return attendees

  }

  async remove(id, userId) {
    const original = await dbContext.Attendees.findById(id)
    const towerEvent = await dbContext.TowerEvents.findById(original.eventId)
    towerEvent.capacity += 1

    if (original.accountId.toString() !== userId) {
      throw new BadRequest('could not remove attendance')
    }
    await towerEvent.save()
    await original.remove()
    return original
  }

}

export const attendeesService = new AttendeesService()