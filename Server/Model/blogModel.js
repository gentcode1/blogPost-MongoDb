import mongoose from "mongoose";


    const blogSchema = new mongoose.Schema({
        title: {type:String, requied:true},
        content:{type:String, required:true},
        userId:{
            type: mongoose.Schema.ObjectId,
            ref:"user",
            required:[true, "user is required"]
        },
        timestamp:{
            type:String
        },
        commentId:[
            {
            type: mongoose.Schema.ObjectId,
            ref:'comment'
     } ]
    })
    blogSchema.pre(/^find/,function (next){
        this.populate({
            path:"userId",
            select:"firstName email"

        }).populate({
            path:'commentId',
            select: 'content user timestamp '
        })
        next();
    })
const blogInfo= mongoose.model('blog', blogSchema)
    export default blogInfo; 