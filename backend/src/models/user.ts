import mongoose, { Schema, Document, Model } from 'mongoose'

interface UserInterface extends Document {
  firstName: string
  lastName: string
  email: string
}

const UserSchema: Schema<UserInterface> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }
  },
  { timestamps: true }
)

const User: Model<UserInterface> = mongoose.model<UserInterface>(
  'User',
  UserSchema
)

export default User
