const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://adityaa32078:nCjVrWxfFXatvJeK@cluster08.4gc3o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster08");
//defining user model schema
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:6,
        maxLength:30,
        lowercase:true,
    },
      password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:30
    },
    firstName:{
    type:String,
    required:true,
    maxLength:50
    },
    lastName:{
    type:String,
    required:true,
    maxLength:50
    }
});
const accountSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',//Taking references
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});
const User= mongoose.model('User',userSchema);
const Account= mongoose.model('Account',accountSchema);
module.exports = {
	User,
    Account
};