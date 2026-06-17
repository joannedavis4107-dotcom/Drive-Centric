// import mongoose
import mongoose from "mongoose";
// schema creation
const TestdriveSchema = new mongoose.Schema({
  carId: String,
  name: String,
  date: String,
  time: String,
  status: String,
  carModel:String,
  totalEstimatedPrice: Number
});

// model creation
var TestdriveModel = mongoose.model("Testdrive", TestdriveSchema);

export default TestdriveModel;