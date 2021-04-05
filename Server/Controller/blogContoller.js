

import blogData from '../Model/blogModel';

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
    static getAllBlog= async(req, res)=>{

         const data= await blogData.find()

      return res.status(200).json({
        status:200,
        message:'posts available here',
        data
    })
}

    static  getOneBlog= async (req, res)=>{
    const blogId=req.params.id;
    const data = await blogData.findById(blogId);
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
    
    static deleteOneBlog= async (req, res)=>
    
    {
        const blogId= (req.params.id);
        
        const data= await blogData.findByIdAndDelete(blogId)

        if(!data){ 
               
            return res.status(417).json({
                    status:417,
                    message: "delete failed",
                 
               })
            }
            const deletedData= await blogData.findById(blogId);
            return res.status(200).json({
                status:200, 
                message:"blog is deleted  successfully ",
                data:deletedData,
            })
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
              
            return res.status(417).json({
                status:417,
                message: "update failed",
            
                 
               })
            }
            const dataUpdated= await blogData.findById(blogId);
            return res.status(200).json({
                status:200,
                message: "blog updated   successfully ",
                data:dataUpdated
            
           
            })

    }
  
    }
    

     export default blogController;