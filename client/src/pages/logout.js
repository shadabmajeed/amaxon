import React, { Component } from 'react'
import Axios from 'axios'

export default class logout extends Component {
    componentDidMount()
    {
     Axios.get('http://localhost:4000/logout',{withCredentials:true}).then((res)=>{
         console.log(res)
         this.props.handlenav()
        this.props.history.push('/')

     })

    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
