const mongoose=require("mongoose")

const schema=new mongoose.Schema({

    text:{
        type:String

    },
    completed:{

        type:Boolean,
        default: false

    }

},{timestamps:true})

module.exports=mongoose.model("model",schema)