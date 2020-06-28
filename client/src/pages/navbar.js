import React, { Component } from 'react'
import Axios from 'axios'
export default class navbar extends Component {
   handleclick=()=>{
       document.querySelector('.slidebar').classList.add('open')
   }
    handleclose=()=>{
    document.querySelector('.slidebar').classList.remove('open')
}
componentDidMount(){
    Axios.get('http://localhost:4000/isauth',{withCredentials:true})
    .then(({data})=>{
        if(data.msg){this.setState({auth:"false"})}
       else if(data.name){this.setState({auth:"true",name:data.name})}
       
       })


}
componentWillReceiveProps(props){
  Axios.get('http://localhost:4000/isauth',{withCredentials:true})
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
             <span className="user">{this.state.name}</span>
        <a href="/cart">Cart</a>
        <a href="/logout" className="logout">Logout</a>
        
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
