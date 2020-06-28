const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
  name:{type:String,required:true},
  password:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  isAdmin:{type:Boolean,required:true,default:false},
  cart:{type:Array,default:[]}

})
module.exports=mongoose.model("user",userSchema)