import mongoose from 'mongoose'

const commentSchema= new mongoose.Schema({
    content:{
        type:String,
require:[true," please provide a comment"]
    },
timestamp:{
    type:Date,
    default: new Date(Date.now())
},
userId:{
    type: mongoose.Schema.ObjectId,
    ref:'user',
    required:[true,'please  provide valid userId']
}


})
commentSchema.pre(/^find/ , function(next){
 this.populate({
     path:'userId',
     select:'firstName email'
 })
 next()
});
const commentInfo= mongoose.model('comment', commentSchema);
export default commentInfo;
