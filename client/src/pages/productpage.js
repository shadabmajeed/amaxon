import React, { Component } from 'react'
import axios from 'axios'
export default class productpage extends Component {
   
   state={}
   componentDidMount()
   {
       axios.get(`http://localhost:4000/product/?id=${this.props.match.params.id}`).then((res)=>{
       
         this.setState({product:res.data})
       })
   } 

   handlecart=()=>{
      const val=document.querySelector('select').value;
    this.props.history.push(`/cart/?qty=${val}&p=${this.props.match.params.id}`)

   }
    render() {
        return (
            <div >
            {!this.state.product?(<div>Loading</div>):
            
            
            (
           <div className="indproduct">
            <div><img src={require(this.state.product.img)}/></div>
             <div className="details">
                 <div className="product-brand">{this.state.product.name}</div>
                 <div>{this.state.product.reviews} customer reviews</div>
                 <div className="product-price">Price:${this.state.product.price}</div>
                
             </div>
             <div className="cart">
             <div className="product-price">Price:${this.state.product.price}</div>
             <div className="product-stock">
               Status:{(this.state.product.qty>0)?"In Stock":" Out of Stock"}

             </div>

             <div className="product-quantity">
               { (this.state.product.qty>0)?(   <div>
               Qty:<select>
                   {[...Array(this.state.product.qty)].map((vals,val)=>{return(<option val={val+1} key={val+1}>{val+1}</option>)})}
                 </select>
                 </div>):(<div/>)} 
            
              </div>  
                 
                <div className="button">
                {
                    (this.state.product.qty>0)?(<button onClick={this.handlecart}>Add to Cart</button>):(<div/>)

                }

                </div>
                 
             </div>
           </div>

            )
            
        
        
        }
            </div>
        )
    }
}
