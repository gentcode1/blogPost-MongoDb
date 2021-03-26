

import blogData from '../Model/blogModel';

const Blogs = [];

 class blogController{
     static Register=(req,res)=> {
        const blogId= Blogs.length+1;
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
        
           const blog= new blogData(blogId, title, content, timestamp, userId);
           Blogs.push(blog);// push user data into users array  
            
           const data = Blogs.find(blog=> blog.blogId=== blogId);

          if(!data){
               
            return res.status(417).json({
                    status:417,
                    message: "Input failed",
                 
               })
            }
            return res.status(201).json({
                status:201,
                message: "blog is created successfully",
                data
            })
          
               
               
           
            
           
        }
    static getAllBlog=(req, res)=>{

         const data= Blogs;

      return res.status(200).json({
        status:200,
        message:'posts available here',
        data
    })
}

    static   getOneBlog=(req, res)=>{
    const blogId=req.params.id;
    const data = Blogs.find(blog=> blog.blogId=== parseInt(blogId) );
    if(!data){
               
        return res.status(417).json({
                status:417,
                message: "Input failed",
             
           })
        }
  
        return res.status(200).json({
            status:200,
            message: "blog by Id is  successfully created",
            data
        })
    
    }  
    
    static deleteOneBlog=(req, res)=>
    
    {
        const blogId= req.params.id;
        const blogIndex= Blogs.indexOf(Blogs.find(blog=>blog.blogId===parseInt(blogId)));
        const data= Blogs.splice(blogIndex, 1);
        
        if(!data){
               
            return res.status(417).json({
                    status:417,
                    message: "delete failed",
                 
               })
            }
            return res.status(200).json({
                status:200, 
                message:"blog is deleted  successfully ",
                data
            })
    }
    static updateBlog= (req, res)=>{
        const blogId= parseInt(req.params.id);
        const blogIndex= Blogs.indexOf(Blogs.find(blog=>blog.blogId===blogId));
        let {
            
            title,
            content,
            userId,
           }= req.body;
           const timestamp = new Date(Date.now());
        const blog= new blogData(blogId, title, content, timestamp, userId);
      
      Blogs.splice(blogIndex,1,blog);
      const data = Blogs.find(b => b.blogId === blogId)
        if(data){
              
            return res.status(200).json({
                status:200,
                message: "blog inserted   successfully ",
                data
            
                 
               })
            }
            return res.status(417).json({
                status:417,
                message: "update failed",
           
            })

    }
  
    }
    

     export default blogController;