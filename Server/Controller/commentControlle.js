import blogInfo from '../Model/blogModel';
import commentInfo from '../Model/commentModel';
import Response from '../Helpers/Response'

class commentController{
  
    static createComment= async(req, res)=>{
       let {content}= req.body;
       let blogIdFromParams= req.params.id;
       
       const newComment= await commentInfo.create(req.body);
       
   const blog= await blogInfo.findByIdAndUpdate(blogIdFromParams,{
       $push:{
           commentId: newComment._id
        }
    });
    if(!blog){
        return Response.errorMsg(res,'failed to create comment', 404);
       

    }
    return Response.successMsg(res, 'thank you for your comment', blog, 200)
      

    }
static deleteComment= async(req, res)=>{
  const commentId= req.params.id;
  const commentData= await commentInfo.findByIdAndDelete(commentId);
 
  if(!commentData){
      return Response.errorMsg(res, 'comment delete failed', 417);
      
  }
  return Response.successMsg(res, 'comment deleted successful', commentData, 200)
  

}
static getOneComment= async (req,res)=>{
    const commentId= req.params.id;
    const CommentData= await commentInfo.findById(commentId);
    if(!CommentData){
  return Response.errorMsg(res, 'cant get the comment', 417);
    }
  return Response.successMsg(res, 'get your comment',CommentData, 200);

}
static getAllComment= async(req,res)=>{
    const commentData= await commentInfo.find();

    if(!commentData){
        return Response.errorMsg(res, 'cant get all comments', 417);

    }
    return Response.successMsg(res,'get all comments',commentData,200);
}
static updateComment= async (req,res)=>{
    const commentId=req.params.id;
    
    //const blogIndex= Blogs.indexOf(Blogs.find(blog=>blog.blogId===blogId));
    let {
       
        content 
        }= req.body;
      
  const data = await commentInfo.findByIdAndUpdate(commentId,{
      content:content
  });
    if(!data){
        return Response.errorMsg(res, 'update failed', 417);  
        
        }
        const commentUpdated= await commentInfo.findById(commentId);
        return Response.successMsg(res, 'comment updated successfully', commentUpdated, 200);
        
}
}
export default commentController;