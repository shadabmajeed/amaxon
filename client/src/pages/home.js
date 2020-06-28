import React, { Component } from 'react'
import axios from 'axios'
import pic from './images/d1.jpg'
export default class home extends Component {
    componentDidMount()
    { 
      axios.get('/products')
    .then((res)=>{this.setState({products:res.data},()=>{
        })
       
       })

    }
    state={ }
  productpage=(id)=>{
 return ()=>{
   this.props.history.push(`/${id}`)
 }


  }
    render() {
         
        return (
            <div >
                {(!this.state.products)?(<h1>Loading</h1>):
                
            ( <div className="products">
                
                
                {this.state.products.map((product,index)=>{
           
                return(
                <div className="product" key={index}>
                <img src={require(product.img)} onClick={this.productpage(product._id)}/>
                <div className="product-name"><a href="slimshirt">{product.name}</a></div>
                <div className="product-brand">{product.name}</div>
               <div className="product-price">${product.price}</div>
        
                </div>
        
        
                )
        
        
                })}
            
            </div>
                
                
                
                )
            
            }
            </div>
        )
    }
}
