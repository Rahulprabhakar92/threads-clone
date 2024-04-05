import mongoose from "mongoose";
const communitieSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    createdBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    Threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
   members:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   }]
});
const Communitie=mongoose.models.User|| mongoose.model('Communitie',communitieSchema);

export default Communitie;
