import React, { Component } from 'react'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'
export default class cart extends Component {
    componentDidMount()
    {  
          
        if(this.props.location.search)
       { const search=this.props.location.search.split('=')
        const qty=search[1].split('&')[0]
        const id=search[search.length-1]
         Axios.post('/cart',{id,qty},{withCredentials:true}).then(res=>{
            if(res.data.auth){this.props.history.push('/')}
            else
             console.log(res)
            this.setState({items:res.data})
         })
       }
       else{

        Axios.get('/cart',{withCredentials:true}).then(res=>{
           
          if(res.data.auth){this.props.history.push('/')}
          else
          
          this.setState({items:res.data})
        }
        )
       }
    }
  componentWillReceiveProps(props){
    Axios.get('/cart',{withCredentials:true}).then(res=>{
          
        this.setState({items:res.data})
    }
    )
   

  }
  changeqty=(id,qty)=>{
    
      console.log("reaching")
     
      Axios.post('/cart',{id,qty},{withCredentials:true}).then(res=>{
        if(res.data.auth){this.props.history.push('/')}
  else
       
        this.setState({items:res.data})
     })



    


  }
    state={
        
    }
    deleteitem=(id)=>{
        
     return()=>{
      const val=document.querySelector('select').value;
    Axios.post('/cart/delete',{id},{withCredentials:true}).then((res)=>{
    this.setState({items:res.data})

    })

     }

    }
    handleimageclick=(id)=>{
     return ()=>{
      this.props.history.push(`/${id}`)

     }
 

    }


    render() {
       
        return (
            <div><div>Loading</div><div>Loading</div>
               {(!this.state.items)?(
                 <div className="loading">
                 <div className="dot dot1"></div>
                 <div  className="dot dot2"></div>
                 <div  className="dot dot3"></div>
 
 
                </div>

               ):(<div>
                <div className="items">
                    <h1>Shopping Cart</h1>
                    {
                     this.state.items.map((item)=>{
                         return(   <div className="cart-product" key={item.id}>
                             <div className="cart-details">
                             <img src={require(item.img)} onClick={this.handleimageclick(item.id)}/>
                          <div>{item.name}
                             <div>
                       Qty:<select value={item.qty}  onChange={(e)=>{this.changeqty(item.id,e.target.value)}}>
                      {[...Array(item.totalqty)].map((vals,val)=>{return(<option val={val+1} key={val+1}>{val+1}</option>)})}
                    </select>
                               <br></br>
                               <button onClick={this.deleteitem(item.id)}>Delete</button> 
   
                             </div>
                          </div>
                       

                             </div>
                             <div className="total">{item.price}*{item.qty}={item.price*item.qty} $</div>
                        
                        </div>)
                  

                     })
                 }
                 
                 <div className="payment">
                     <br></br>
                <h5>Subtotal({this.state.items.length} items) </h5> 
                <button id="checkout-button">Proceed to checkout</button>

                 </div>

                </div>



               </div>)}
            </div>
            
        )
    }
}
