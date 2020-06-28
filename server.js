const express=require('express')
const app=express()
const cors=require('cors')
const path=require('path')
const mongoose=require('mongoose')
const userroute=require('./database/route')
const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy
const user=require('./database/user')
const session=require('express-session')
const product=require('./database/product')
app.use(cors({origin:'http://localhost:3000',
credentials:true

}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
mongoose.connect('mongodb+srv://shadab:shadab@cluster0-vn19w.mongodb.net/amaxonusers?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true}).then(
 ()=>{ console.log('db connected')}   

).catch(err=>{console.log(err)})

//------------------passport-----------------------------------

passport.serializeUser((user,done)=>{done(null,user.id)})
passport.deserializeUser((id,done)=>{
  
 user.findById(id,(err,data)=>{
   
     if(err) {done(err)}
     else if(data){done(null,data)}
     else{done(null,false)}
 })

})
passport.use(new LocalStrategy((username,password,done)=>{
  user.findOne({email:username,password},(err,user)=>{if(err){done(err)}
      else if(user){;done(null,user)}
      else{done(null,false)}
})

}))
const PORT=process.env.PORT
app.listen(PORT||4000)
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 12*60*60000}}))
app.use(passport.initialize())
app.use(passport.session())
app.post('/signin',passport.authenticate('local',{successRedirect:'/isauth',failureRedirect:'/isauth'}))
app.get('/isauth',(req,res)=>{
if(req.isAuthenticated()){res.send({name:req.user.name}) }
else  {res.send({msg:"not auth"})}
})
app.post('/register',(req,res)=>{
user.findOne({email:req.body.email},(err,data)=>{
    
    if(err) throw err;
    else if(data){res.send({msg:"Email Already Exists"})}
    else{
      user.create({name:req.body.name,password:req.body.password,email:req.body.email},(err,data)=>{
       if(err) throw err
       else{
           req.logIn(data,(err)=>{if(err)throw err;return res.redirect('/isauth')})
       }

      })

    }

})

})
app.get('/logout',(req,res)=>{
 req.logOut()
 res.send("done")

})

//-----------------------------------------------------------------------

app.use('/user',userroute)
app.get('/products',(req,res)=>{ 
   product.find({}).then(datas=>{res.send(datas)}).catch(err=>{throw err})


 })
app.get('/product',(req,res)=>{
 product.findOne({_id:req.query.id}).then(data=>res.send(data)).catch(err=>{throw err})
})

//CART_______________________-------------------------___________________________


app.post('/cart',async(req,res)=>{
if(!req.isAuthenticated()){return res.send({auth:"false"})} 
else
{ 
  const cartval={id:req.body.id,qty:req.body.qty}
  
  const handlecart=async(cartitems)=>{
   
    const newcart=[]
      for(i=0;i<cartitems.length;i++)
      {  try{const pro=await product.findOne({_id:cartitems[i].id})
               if(pro){
                 newcart.push({id:cartitems[i].id,qty:cartitems[i].qty,name:pro.name,img:pro.img,price:pro.price,totalqty:pro.qty})
               }   
           
           }
         catch(err){throw err}

      }
      return res.send(newcart)
 
  }
 
  try{
  
    const product=await user.findOne({_id:req.user.id,"cart.id":req.body.id})
    if(product){
      const updated=await user.findOneAndUpdate({_id:req.user.id,"cart.id":req.body.id},{$set:{"cart.$.qty":req.body.qty}},{new:true})
      handlecart(updated.cart)

    }
    else{
    const updated=await user.findOneAndUpdate({_id:req.user.id},{$push:{"cart":{id:req.body.id,qty:req.body.qty}}},{new:true})
    handlecart(updated.cart)
    }







  }
  catch(err){throw err}
 
  

}
})

app.get('/cart',async (req,res)=>{

    if(!req.isAuthenticated()){return res.send({auth:"false"})} 
    const handlecart=async(cartitems)=>{
   
      const newcart=[]
        for(i=0;i<cartitems.length;i++)
        {  try{const pro=await product.findOne({_id:cartitems[i].id})
                 if(pro){
                   newcart.push({id:cartitems[i].id,qty:cartitems[i].qty,name:pro.name,img:pro.img,price:pro.price,totalqty:pro.qty})
                 }   
             
             }
           catch(err){throw err}
    
        }
        return res.send(newcart)
    
    }
    

const cartitems=await user.findById(req.user.id)
handlecart(cartitems.cart)




})

app.post('/cart/delete',(req,res)=>{
  
   user.findOneAndUpdate({_id:req.user.id},{$pull:{cart:{id:req.body.id}}},{new:true}) 
   .then(Response=>{res.redirect('/cart')}).catch(err=>{throw err})  

})



//----------------------------------------------------------------



if(process.env.NODE_ENV==='production')
{
 app.use(express.static(path.join(__dirname,'client','build')))
 app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','build','index.html'))

 })


}