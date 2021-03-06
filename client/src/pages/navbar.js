import React, { Component } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
export default class navbar extends Component {
   handleclick=()=>{
       document.querySelector('.slidebar').classList.add('open')
   }
    handleclose=()=>{
    document.querySelector('.slidebar').classList.remove('open')
}
componentDidMount(){
    Axios.get('/isauth',{withCredentials:true})
    .then(({data})=>{
        if(data.msg){this.setState({auth:"false"})}
       else if(data.name){this.setState({auth:"true",name:data.name})}
       
       })


}
handlecart=()=>{
this.props.history.push('/cart')


}
handlelogout=()=>{

  this.props.history.push('/logout')

}
componentWillReceiveProps(props){
  Axios.get('/isauth',{withCredentials:true})
  .then(({data})=>{
      if(data.msg){this.setState({auth:"false"})}
     else if(data.name){this.setState({auth:"true",name:data.name})}
     
     })

}

state={}

  render(){
    return (
        <div className="container">
                 <header>
      <div className="brand">
          <button onClick={this.handleclick}>
             &#9776; 
          </button>
      <a href="/">Amaxon</a>

      </div>
    <div className="header-links">
        {(this.state.auth)?(
          <div>{(this.state.auth=="true")?(<div>
             <span className="user userval">{this.state.name}</span>
             <span className="user" onClick={this.handlecart} name="cart">Cart</span>
             <span className="user" onClick={this.handlelogout} name="logout">Logout</span>
          </div>):(<div> <a href="/signin">Signin</a></div>)}</div>

        )
     :(<div></div>)}
     
      

    </div>


     </header>
    <div className="slidebar">
        <div> <h1>Shopping Categories</h1>
         <button onClick={this.handleclose}>x</button>
        </div>
        <ul>
         <li><a href="pants">Pants</a></li>
         <li><a href="Shirts">Shirts</a></li>

       </ul> 


    </div>
     
    
        </div>
    )
  }
    
}
