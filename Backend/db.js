import mongoose from "mongoose";

// Disable command buffering globally so queries fail immediately if connection is down
mongoose.set('bufferCommands', false);

const mongoURI = process.env.MONGODB_URI || "mongodb://test:test@ac-uegqbhu-shard-00-00.91kqmqz.mongodb.net:27017,ac-uegqbhu-shard-00-01.91kqmqz.mongodb.net:27017,ac-uegqbhu-shard-00-02.91kqmqz.mongodb.net:27017/CarData?ssl=true&replicaSet=atlas-h42u4x-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 5000 // fail fast if Atlas database is unreachable
}).then (()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.error("Database connection error:", err.message)
})