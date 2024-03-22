import mongoose, { models }  from "mongoose";


const userSchema=new mongoose.Schema({
    id:{type:String,required:true},
    username:{type:String,required:true},
    name:{type:String,required:true},
    image:String,
    bio:String,
    Threads:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Threads'
    }],
    onboard:{
        type:Boolean,
        default:false
    },
    Communities:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Communities'
    }]
})
const user=mongoose.models.User|| mongoose.model('User',userSchema);

export default user;