import express from "express";
import blogController from "../Controller/blogContoller";
import { verifyAuth } from "../middleware/AuthVerification";
import blogValidator from "../middleware/blogValidator";

const blogRoute = express.Router();
blogRoute.post(
  "/auth/blog/create",
  blogValidator.newBlogRules(),
  blogValidator.blogValidateInput,
  verifyAuth,
  blogController.Register
);
blogRoute.get("/auth/blog/post", verifyAuth, blogController.getAllBlog);
blogRoute.get("/auth/blog/One/:id", verifyAuth, blogController.getOneBlog);
blogRoute.delete(
  "/auth/blog/del/:id",
  blogValidator.verifyAccess,
  verifyAuth,
  blogController.deleteOneBlog
);
blogRoute.put(
  "/auth/blog/update/:id",
  blogValidator.verifyAccess,
  verifyAuth,
  blogController.updateBlog
);
//blogRoute.post(verifyAuth, blogController  );

export default blogRoute;
