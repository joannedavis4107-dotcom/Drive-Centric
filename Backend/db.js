import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI || "mongodb://test:test@ac-uegqbhu-shard-00-00.91kqmqz.mongodb.net:27017,ac-uegqbhu-shard-00-01.91kqmqz.mongodb.net:27017,ac-uegqbhu-shard-00-02.91kqmqz.mongodb.net:27017/CarData?ssl=true&replicaSet=atlas-h42u4x-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(mongoURI).then (()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.error("Database connection error:", err)
})