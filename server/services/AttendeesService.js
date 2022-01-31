import { dbContext } from "../db/DbContext";
import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"


class AttendeesService {

  async create(newAttendee) {
    const attendee = await dbContext.Attendees.create(newAttendee)
    await attendee.populate('creator', 'name description')
    return attendee
  }

  async getAll(query = {}) {
    const attendance = await dbContext.Attendees.find(query).populate('creator', 'name description')
    return attendance
  }

  async getByEventId(eventId) {
    const attendees = await dbContext.Attendees.find({ eventId: eventId }).populate('creator')
    if (!attendees) {
      throw new BadRequest('Invalid Event Id')

    }
    return attendees

  }

  async remove(id, userId) {
    const original = await dbContext.Attendees.findById(id)
    if (original.accountId.toString() !== userId) {
      throw new BadRequest('could not remove attendance')
    }
    await original.remove()
    return original
  }

}

export const attendeesService = new AttendeesService()