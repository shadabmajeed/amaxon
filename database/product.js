const mongoose=require('mongoose')
const Schema=mongoose.Schema
console.log('prod')
const productSchema=new Schema({
  name:{type:String,required:true,unique:true},
  category:{type:String,required:true},
  price:{type:String,required:true,default:"0"},
  brand:{type:String,required:true},
  rating:{type:Number,required:true},
  reviews:{type:Number,required:true},
  img:{type:String,required:true},
  qty:{type:Number,required:true}})


module.exports=mongoose.model("product",productSchema)


