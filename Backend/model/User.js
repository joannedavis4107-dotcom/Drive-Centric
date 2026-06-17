// import mongoose
import mongoose from "mongoose";
// schema creation
var UserSchema = mongoose.Schema({
  name: String,
  password: String,
  role: String
});

// model creation
var UserModel = mongoose.model("User", UserSchema);

export default UserModel;