// Write an api for Book resource
// 1. Get one/all books
// 2. Create book
// 3. Update book
// 4. Delete book

// Tasks:
// * Please add authentication and all routes should be restricted. 
// * Use appropriate database. 
// * Add proper folder structure.
// * Use Coding best practices
// * Make assumptions whenever necessary
// * Book info may have image
// * Use node js security best practices

// Note: Once you are done with  assignment, please share git repo.

const bookModel= require("../models/bookModel")
const jwt=require("jsonwebtoken")

const isValid=function(value){
    if(typeof value==="undefined" || value===null)return false 
    if(typeof value==="string" && value.trim().length===0)return false 
    return true
}

const isValidRequestBody=function(body){
    return Object.keys(body).length>0 
}

const createbook= async function (req, res) {
    try {
        let body = req.body

        if(!isValidRequestBody(body)){
            return res.status(400).send({status:false,message:"Invalid request parameters please provide book details"})
        }
        const {Name,Imageurl,Author,pages,price,email,password}=req.body
        if(!isValid(Name)){
            return res.status(400).send({status:false,message:"Name is required"})

        }
        if(!isValid(Imageurl)){
            return res.status(400).send({status:false,message:"Imageurl is required"})

        }
        if(!isValid(Author)){
            return res.status(400).send({status:false,message:"Author is required"})

        }
        if(!isValidTitle(pages)){
            return res.status(400).send({status:false,message:"Please provide pages"})

        }

        if(!isValid(price)){
            return res.status(400).send({status:false,message:"price is required"})
        }
        if(!isValid(email)){
            return res.status(400).send({status:false,message:"Email is required"})

        }
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
           return res.status(400).send({status:false,message:"Email should be valid"})
        }
        if(!isValid(password)){
            return res.status(400).send({status:false,message:"Password is required"})}

        const author=await authorModel.create(body)
        res.status(201).send({status:true,message:"created successfully",data:author})
    
}
catch (err) {
    
    res.status(500).send({ status:false, data: err.message })
}}

const getBooks=async function(req,res){
    try{
        const query={isDeleted:false}                    // we will return that book only which are not deleted
        const getQuery=req.query                         // we are gaining access of data from query
        if(isValidRequestBody(getQuery)){
            
            const {Name,Author}=getQuery 
            if(isValid(Name)){
                query.Name=Name
            }
            if(isValid(Author)){
                query.Author=Author
            }}
        const getBooks=await blogsModel.find(query)
        if(getBooks.length===0){
            return res.status(404).send({status:false,message:"No books found"})
        }
        return res.status(200).send({status:true,data:getBooks})}
    catch(err){
        res.status(500).send({msg:err.message})
    }}


    const updateBook=async function(req,res){
        try{
            const reqbody=req.body 
            let id=req.params.bookId                   // we are gaining access of bookId from params as to know which book to edit
            const bookToken=req.bookId
            if(!isValidObjectId(id)){
                return res.status(400).send({status:false,message:"Book id is not valid"})
            }
            if(!isValidObjectId(bookToken)){
                return res.status(400).send({status:false,message:"Book id is not valid"})
            }
            let blog=await blogsModel.findOne({_id:id,isDeleted:false})
    
            if(!blog){ //if no data found then send error message
                return res.status(404).send({status:false,data:"blog not present"})
            }
            if(blog.bookId.toString()!==bookToken){
                return res.status(401).send({status:false,message:"Unauthorised access"})   // authorisation part
            }
            if(!isValidRequestBody(reqbody)){
                return res.status(200).send({status:true,message:"Blog unmodified",data:blog})
            }
            const {Name,Imageurl,Author,pages,price}=reqbody
            const updateBlog={}
            
            if(isValid(Name)){
                updateBlog.Name=req.body.Name
            }
            if(isValid(Imageurl)){
                updateBlog.Imageurl=req.body.Imageurl
            }
            if(isValid(Author)){
                updateBlog.Author=req.body.Author
            }
            
            if(isValid(pages)){
                updateBlog.pages=req.body.pages
                        }
            if(isValid(price)){
                updateBlog.price=req.body.price }

            
            const updateBook=await blogsModel.findOneAndUpdate({_id:id},updateBlog,{new:true})
            
            res.status(200).send({status:true,data:updateBook})
    
        }
        catch(err){
            res.status(500).send({status:false,msg:err.message})
        }
    }


    const deleteId=async function(req,res){                             // a user can provid the Id of the book and can delete it 
        try{
            let id=req.params.bookId 
            const bookToken=req.bookId
            if(!isValidObjectId(id)){
                return res.status(400).send({status:false,message:"Book id is not valid"})
            }
            if(!isValidObjectId(bookToken)){
                return res.status(400).send({status:false,message:"Book id is not valid"})
            }
            let blog=await blogsModel.findOne({_id:id,isDeleted:false})
    
            if(!blog){ //if no data found then send error message
                return res.status(404).send({status:false,data:"blog not present"})
            }
            if(blog.authorId.toString()!==authorToken){                     
                return res.status(401).send({status:false,message:"Unauthorised access"})   //checking the authorization
            }
            await blogsModel.findOneAndUpdate({_id:id},{$set:{isDeleted:true}})             // we are onlychanging the status from the DB
            return res.status(200).send({status:true,message:"Book deleted succesfully"})
         }
    catch(err){
        res.status(500).send({status:false,data:err.message})
    }}


const loginAuthor=async function(req,res){
    try{
    let body=req.body 
    if(!isValidRequestBody(body)){
            return res.status(400).send({status:false,message:"Please provide login details"})
    }        
    let {email,password}=req.body
    if(!isValid(email)){
        return res.status(400).send({status:false,message:"Email is required"})

    }
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        return res.status(400).send({status:false,message:"Email should be valid"})
     }
     if(!isValid(password)){
        return res.status(400).send({status:false,message:"Password is required"})

    }


    let data=await authorModel.findOne({email:email,password:password})
    if(!data){
        res.status(400).send({status:false,message:"Invalid login credentials"})
    } 
    else{
        let token=jwt.sign({userId:data._id,batch:"young labs"},"Assignment")
        res.status(200).send({status:true,data:{token:token}})
}}
catch(err){
    res.status(500).send({status:false,data:err.message})
}}

module.exports.createbook= createbook
module.exports.loginAuthor=loginAuthor
module.exports.getBooks= getBooks
module.exports.updateBook= updateBook
module.exports.deleteId= deleteId
