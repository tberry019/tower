
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
export const AttendeeSchema = new Schema({
  eventId: { type: ObjectId, required: true },
  accountId: { type: ObjectId, ref: 'Profile', required: true }

},
  { timestamps: true, toJSON: { virtuals: true } }

)

AttendeeSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})