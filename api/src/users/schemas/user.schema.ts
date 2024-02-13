import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

export const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
