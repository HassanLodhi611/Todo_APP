
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const routes = require("./Routes/routes");
const app=express();

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/tododb").then(()=>{
    console.log("Data BAse Connected Successfully")
})
.catch((err)=>{
    console.log("Error Connecting Database:"+err)
})

// console.log("Routes value:", routes);
app.use("/api/todos",routes)


app.listen(5000,()=>{
    console.log("Server Running On Port 5000")
})
