import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from'react-router-dom'
import './style.css'
import Home from './pages/home'
import Navbar from './pages/navbar'
import Productpage from './pages/productpage'
import Cart from './pages/cart'
import Signin from './pages/signin'
import Register from './pages/register'
import Logout from './pages/logout'
class App extends Component {
  state={
    auth:"false"
  }
  handlenav=()=>{
    this.setState({auth:"true"})


  }

  render() {
    return (
     
     <BrowserRouter>
      <div >
      <Route path="/"
            render={(props)=><Navbar {...props} handlenav={this.handlenav}></Navbar>}/>

        <Switch>
          <Route path="/signin"
            render={(props)=><Signin {...props} handlenav={this.handlenav}></Signin>}/>

          <Route path="/register" 
            render={(props)=><Register {...props} handlenav={this.handlenav}></Register>}
          />
           <Route path="/logout" 
            render={(props)=><Logout {...props} handlenav={this.handlenav}></Logout>}
          />

        <Route  path='/cart' component={Cart}/> 
        <Route exact path='/:id' component={Productpage}/> 
       
       <Route exact path='/' component={Home}/> 

        </Switch>
       
      
      </div>
     
     </BrowserRouter>
      
    
     
    );
  }
}

export default App;
