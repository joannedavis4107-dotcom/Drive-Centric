import express from "express";
import "./db.js";
import User from "./model/User.js";
import Car from "./model/Car.js";
import Testdrive from "./model/Testdrive.js";
import cors from "cors"
import mongoose from "mongoose";
import path from 'path'
import { fileURLToPath} from 'url'

// initialize express
var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)


// middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/dist')));



// API to add data to db
app.post("/api/auth/s", async (req, res) => {
  try {
   const newUser = new User(req.body);
    await newUser.save();
    res.send("Account created succesfully");
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const {name, password, role } = req.body;
    console.log(`Attempting access for: ${name}`);
    if (!name || !password) {
      return res.json({message: "fields cannot be blank."});
    }

    let user = await User.findOne({ name: name });

    if (!user) {
      console.log(`User "${name}" is new. auto-saving to database.`);
      user = new User({
        name: name,
        password: password,
        role: role || (name.toLowerCase() === 'admin' ? 'admin' : 'customer')
      });
      await user.save();
      console.log(`User "${name}" successfully registered and stored.`);
    }

    if (user.password !== password) {
      return res.json({message: "authentication failed. worng password"});
    }

    // if (name === 'admin' && password === 'admin123') {
    //   res.send("Welcome back");
    //   alert("welcome");
    // }
      
      return res.status(200).json({ message: "Customer login successfull", token: "generated-user-session-token", user: { id: user._id, name: user.name, role: user.role}});
  } catch (error) {
    console.log("backend error");
    res.send("server login error");
  }
});
//API  to get all car details
app.get("/api/car", async (req, res) => {
  try {
    const carData = await Car.find();
    res.status(200).json(carData);
  } catch (error) {
    console.log("error");
    res.send("error fetching");
  }
});
//API to view cars
app.post('/api/car', async(req, res) =>{
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.send("car saved");
  } catch (error) {
    console.log("error");
  }
});

//API to delete cars
app.delete("/api/car/:id" , async (req, res) => {
  try {
    const carId = req.params.id;

    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).send("Target vehicle record was not found")
    }
    res.status(200).json({ message: "Vehicle record successfuly deleted"})
  } catch (error) {
    console.log("car error");
    res.send("Internal serror error");
    
  }
});

//API to update cars
app.put("/api/car/:id", async (req, res) => {
  try {
    const carId = req.params.id;
    const updatedCar = await Car.findByIdAndUpdate(carId, req.body, { new: true });
    if (!updatedCar) {
      return res.status(404).send("Target vehicle record was not found")
    }
    res.status(200).json({ message: "Vehicle record successfully updated", car: updatedCar })
  } catch (error) {
    console.log("car update error", error);
    res.status(500).send("Internal server error");
  }
});


//API to get the information of testdrive booking
app.get("/api/test", async (req, res) => {
  try {
    const allBookings = await Testdrive.find({}).populate('carId');
    const cleanlog= allBookings.map(b =>({
       _id: b._id,
       name: b.name,
      date: b.date,
      time: b.time,
      status: b.status,
      carModel: b.carId ? b.carId.modelName : "unmapped model assest"
    }));
    res.json(allBookings);
  } catch (error) {
    console.log("error")
  }
});
app.post("/api/test/book", async (req, res) => {
  try {
    console.log('data recevied', req.body)

    const newBooking = new Testdrive({
      carId: req.body.carId,
      name: req.body.name,
      carModel: req.body.carModel,
      date: req.body.date,
      time: req.body.time,
      totalEstimatedPrice: req.body.totalEstimatedPrice,
      status: 'Pending'
    });
    await newBooking.save();
    res.send("Booking recorded successfully")
  } catch (error) {
    console.log('error');
    res.send('error in booking');
  }
 });
//API to cancell booking
app.delete("/api/booking/:id", async (req, res) => {
   try {
    const bookingId = req.params.id;

    const deletedTest = await Testdrive.findByIdAndDelete(bookingId);

    if (!deletedTest) {
      return res.status(404).send("Target vehicle record was not found")
    }
    res.status(200).json({ message: "Vehicle record successfuly deleted"})
  } catch (error) {
    console.log("car error");
    res.send("Internal serror error");
    
  }
});

app.get("/api/mybook", async (req, res) => {
  try {
    const client = req.query.name || req.query.username || req.query.userName;
    console.log("simple fetch",client);
    if (!client || client === 'undefined' || client === "null") {
      return res.json([]);
    }
    const searchRegex= { $regex: new RegExp("^" +client + "$","i")}
    const userbooking = await Testdrive.find({
      $or: [
        { userName: searchRegex},
        { name: searchRegex},
        { username: searchRegex}
      ]
    });
    console.log(`Db search completed .found ${userbooking.length} record for ${client}`);

    if(!userbooking || userbooking.length === 0){
      return res.status(200).json([]);
    }
    const cleanbook = userbooking.map(test => {
      return{
        _id: test._id,
       name: test.name,
      date: test.date,
      time: test.time ,
      status: test.status || "pending",
      carModel: test.carModel || test.carName || "unmapped model assest"
      }
    });
    res.status(200).json(cleanbook);
  } catch (error) {
    console.error("backend simplified")
    res.json([]);
  }
});
//   try {
//     await TestDrive.findByIdAndDelete(req.params.id);
//     res.send("data deleted");
//   } catch (error) {
//     console.log("error");
//   }
// });
//API to update testdrive booking
app.put("/api/test/:id", async (req, res) => {
  try {
    await Testdrive.findByIdAndUpdate(req.params.id, req.body);
    res.send("data updated");
  } catch (error) {
    console.log("error");
  }
});
  
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// server in listening mode
const PORT = process.env.PORT || 3004;
app.listen(PORT, '0.0.0.0' , () => {
  console.log(`server is running in ${PORT}`);
});