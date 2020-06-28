import React, { Component } from 'react'
import Axios from 'axios'

export default class logout extends Component {
    componentDidMount()
    {
     Axios.get('/logout',{withCredentials:true}).then((res)=>{
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
