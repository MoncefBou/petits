import React, { Component } from 'react'
import './Circle.css'

class Circle extends Component {
    render() {
        return (
            <i className="fas fa-circle " style={{background: this.props.circleColor}}></i>
        )
    }
}

export default Circle