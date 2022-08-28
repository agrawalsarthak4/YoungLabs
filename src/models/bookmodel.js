const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    Name: {type:String, required:"Name is required",trim:true},
    Imageurl: {type:String, trim:true, validate:{
        validator:function(v){
            return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(v);
        },
        message:"Please enter a valid url"
    } ,
        Author: {type:String, required:"Author is required",trim:true},
        pages: {type:Number, required:"pages is required",trim:true},
     price: {type:Number, required:"price is required",trim:true} ,
     
     password: {type:String, required:"Password is required",trim:true} ,
     email: {type:String, required:"Email is required",trim:true,lowercase:true, validate:{
        validator:function(v){
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message:"Please enter a valid email"                       
    },                                             // email and password keys are added for login and authentication purpose
    isDeleted: {type:Boolean, default: false},     // is Deleted key is taken as to check if the book is deleted or not

     }
},  timestamps: true });


module.exports = mongoose.model('Book', bookSchema) 

// Book Fields
// * Name
// * Image url
// * Author
// * pages
// * price