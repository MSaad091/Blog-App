import { Router } from "express";
import { LoginUser, LogoutUser, RegisterUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middlewares/auth.js";
import { Comments, CreateBlog ,DeleteComments,GetallBlog, GetAllComments, getsingleBlog, Likes, UpdateBlog} from "../controller/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();


router.route('/register').post(RegisterUser)
router.route('/login').post(LoginUser)
router.route('/logout').post(verifyJWT,LogoutUser)
router.post(
  "/createblog",
  verifyJWT, // pehle JWT check
  upload.single("image"), // single file, key = 'image'
  CreateBlog
);
     
router.route('/getallblog').get(GetallBlog)
router.route('/getblog/:id').get(getsingleBlog)
router.post("/like/:id", verifyJWT, Likes);
router.post("/comment/:id", verifyJWT, Comments);
router.get('/comments/:id',verifyJWT,GetAllComments)
// DELETE a specific comment by comment ID and blog ID
router.delete('/comment/delete/:blogId/:commentId', verifyJWT, DeleteComments);

router.post(
  '/updateblog/:blogId',
  verifyJWT,          // verify user first
  upload.single('image'), // then handle file upload
  UpdateBlog
);




export default router
