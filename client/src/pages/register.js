import React, { Component } from 'react'
import Axios from 'axios'

export default class register extends Component {
    state={err:""}
    handlesubmit=()=>{
       if(this.state.password!==this.state.cpassword){
           this.setState({err:"passwords don't match"})
       }
       else if(!this.state.name||!this.state.username||!this.state.password||!this.state.cpassword){
        this.setState({err:"Please Fill In The Details"})

       }
       else{
       Axios.post('/register',{name:this.state.name,password:this.state.password,email:this.state.username}
       ,{withCredentials:true}).then(({data})=>{
        if(data.msg){this.setState({err:data.msg})}
        else if(data.name){this.props.handlenav();this.props.history.push('/')}
       })

       }
       }
       handlechange=(e)=>{
       this.setState({[e.target.name]:e.target.value})
   
       }
       componentDidMount(){
        Axios.get('/isauth'
        ,{withCredentials:true}).then(({data})=>{
         if(data.msg){this.setState({reqcompleted:true})}
         else if(data.name){this.props.history.push('/')}
        })

       }
    render() {
        return (
            <div className="signin">
               {(!this.state.reqcompleted)?(
                <div className="loading">
                <div className="dot dot1"></div>
                <div  className="dot dot2"></div>
                <div  className="dot dot3"></div>


               </div>
            

               ):
               
               (    <div  className="box">
               <h1>Register</h1>
                      <div className="error">
                      {this.state.err}
                      </div>
                      <div>
                     <label htmlFor="name">Name</label>
                     <br></br>
                      <input id="name" name="name" onChange={this.handlechange}></input> 
                     </div>
                     <div>
                     <label htmlFor="username">Email</label>
                     <br></br>
                      <input id="username" name="username" onChange={this.handlechange}></input> 
                     </div>
                   <div>
                   <label htmlFor="password">Password</label><br></br>
                      <input id="password" name="password" type="password"  onChange={this.handlechange}></input> 
                   </div>
                   <div>
                   <label htmlFor="cpassword">Confirm Password</label><br></br>
                      <input id="cpassword"  name="cpassword" type="password" onChange={this.handlechange}></input> 
                   </div>
                      
                      <button onClick={this.handlesubmit}>Signup</button>
                      <a href="/signin">Already have an Account?</a>
                   </div>  )
               }
            
            </div>
        )
    }
}
