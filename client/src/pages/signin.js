import React, { Component } from 'react'
import Axios from 'axios'

export default class signin extends Component {
    state={err:""}
    handlesubmit=()=>{
     Axios.post('/signin',{username:this.state.username,password:this.state.password},{withCredentials:true})
     .then(({data})=>{
         if(data.msg){this.setState({err:"username or password doesn't match"})}
        else if(data.name){this.props.handlenav();this.props.history.push('/')}
        
        })

    }
    componentDidMount()
    {
      Axios.get('/isauth',{withCredentials:true})
     .then(({data})=>{
         
      if(data.name){this.props.history.push('/')}
      else{
      this.setState({reqcomplete:true})
      }
        })

    }

    handlechange=(e)=>{
    this.setState({[e.target.name]:e.target.value})

    }
    render() {
        return (
            <div className="signin">
               {(!this.state.reqcomplete)?(<div className="loading">
                <div className="dot dot1"></div>
                <div  className="dot dot2"></div>
                <div  className="dot dot3"></div>


               </div>):
               (
                <div className="box">
                <h1>LOGIN</h1>
                       <div className="error">
                       {this.state.err}
                       </div>
                     
                      <div>
                      <label htmlFor="username">Email</label>
                      <br></br>
                       <input required id="username" name="username" onChange={this.handlechange}></input> 
                      </div>
                    <div>
                    <label htmlFor="password">password</label><br></br>
                       <input required id="password" type="password" name="password" onChange={this.handlechange}></input> 
                    </div>
                       
                       <button onClick={this.handlesubmit}>Login</button>
                       <a href="/register">Don't have an Account?</a>
                    </div>    
               )
            
            
            }
       
            </div>
        )
    }
}
