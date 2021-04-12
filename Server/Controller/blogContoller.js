

import blogData from '../Model/blogModel';
import Response from '../Helpers/Response';

//const Blogs = [];

 class blogController{
     static Register= async(req,res)=> {
        //const blogId= Blogs.length+1;
         let {
            
             title,
             content,
             userId,
            }= req.body;
            const timestamp = new Date(Date.now());
        /* const is_blogRegistered= Blogs.find(blog=>blog.title===title);       
        if(is_blogRegistered){
             return res.status(409).json({statu:409, error:"blog arleady registered"});
         }*/
        
          // const blog= new blogData(blogId, title, content, timestamp, userId);
          // Blogs.push(blog);// push user data into users array  
            
           const data = blogData.create(req.body);

          if(!data){  
            return Response.errorMsg(res, 'Input failed', 417);   
           
            }

            return Response.successMsg(res,'blog created successfuly', data,201)
           
           
        }
    static getAllBlog= async(req, res)=>{

         const data= await blogData.find()
     return Response.successMsg(res, 'post available here', data,200);
  
}

    static  getOneBlog= async (req, res)=>{
    const blogId=req.params.id;
    const data = await blogData.findById(blogId);
    if(!data){
        return Response.errorMsg(res, 'cant find blog', 417);     
        
        }
        return Response.successMsg(res, 'get a blog', data,200);
     
    }
    static deleteOneBlog= async (req, res)=>
    
    {
        const blogId= (req.params.id);
        
        const data= await blogData.findByIdAndDelete(blogId);
        const deletedData= await blogData.findById(blogId);
        if(!data){ 
        

            return Response.errorMsg(res, 'delete blog failed', 417);   
            
            }
            return Response.successMsg(res,'blog deleted successfully',deletedData,200);
           
    }
    static updateBlog= async (req, res)=>{
        const blogId= req.params.id;
        //const blogIndex= Blogs.indexOf(Blogs.find(blog=>blog.blogId===blogId));
        let {
            
            title,
            content, 
            }= req.body;
          
      const data = await blogData.findByIdAndUpdate(blogId,{
          title: title,
          content:content
      });
        if(!data){
            return Response.errorMsg(res, 'update failed', 417);  
            
            }
            const dataUpdated= await blogData.findById(blogId);
            return Response.successMsg(res, 'blog updated successfully', dataUpdated, 200);
            
    }
  
    }
    

     export default blogController;