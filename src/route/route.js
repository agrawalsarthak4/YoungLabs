const express = require('express');
const router = express.Router();

const bookController= require("../controllers/bookController")
const middlewareController=require("../middleware/mid")



router.post("/createbook", bookController.createbook) // Book creation
router.post("/login",bookController.loginAuthor)   //Author login 
router.post("/books",middlewareController.authenticate,bookController.createbooks) //creating books for the author who is logged in
router.get("/books",middlewareController.authenticate,bookController.getbooks) //get all th books when the condition is satisfied which is passed in query params and which belongs to the same author who is logged in
router.put("/books/:bookId",middlewareController.authenticate,bookController.updatebooks) // updating a blog when bookId is present in path params
router.delete("/books/:bookId",middlewareController.authenticate,bookController.deleteId)  //deleting a blog when bookId is present in path params 





module.exports = router;