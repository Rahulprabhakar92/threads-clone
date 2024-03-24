import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    Threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    onboarded: {
        type: Boolean,
        default: false
    },
    Communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Communitie'
        }
    ]
});
const User=mongoose.models.User|| mongoose.model('User',userSchema);

export default User;
