const express=require('express')
const route=express.Router()
const user=require('./user')

admin={
 name:"shadab",
 password:"shadab",
 email:"sadabmajeed@gmail.com"
, isAdmin:true

}
route.get('/admin',(req,res)=>{
user.create(admin).then(data=>res.send(data))
})
module.exports=route