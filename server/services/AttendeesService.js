import { dbContext } from "../db/DbContext";


class AttendeesService {

  async create(newAttendee) {
    const attendee = await dbContext.Attendees.create(newAttendee)
    await attendee.populate('creator', 'name description')
    return attendee
  }

}




export const attendeeService = new AttendeesService()