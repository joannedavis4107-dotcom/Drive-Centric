// import mongoose
import mongoose from "mongoose";
// schema creation
var CarSchema = mongoose.Schema({
  modelName: String,
  variant: String,
  basePrice: Number,
  transmission: String,
  fuelType: String,
  imageUrl: String,
  status: String
});

// model creation
var CarModel = mongoose.model("Car", CarSchema);

export default CarModel;