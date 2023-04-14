import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  createAt: { type: Date, default: Date.now },
});

const Users = mongoose.model("Users", UserSchema);

export default Users;
