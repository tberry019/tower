import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"


class CommentsService {
  async create(newComment) {
    const comment = await dbContext.Comments.create(newComment)
    await comment.populate('creator', 'name description')
    return comment
  }
  async getByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator')
    if (!comments) {
      throw new BadRequest('Invalid Comment Id')
    }
    return comments
  }

  async remove(id, userId) {
    const original = await dbContext.Comments.findById(id)
    if (original.creatorId.toString() !== userId) {
      throw new BadRequest('could not remove comment')
    }
    await original.remove()
    return original
  }
}


export const commentsService = new CommentsService()