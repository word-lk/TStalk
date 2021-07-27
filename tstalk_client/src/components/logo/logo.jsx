import React, { Component } from 'react'
import './logo.css'

export default class logo extends Component {
    render() {
        return (
            <div className='logo-container'>
                <div className='logo-upball' />
                <div className='logo-shadow' />
                <div className='logo-downball'/>
            </div>
        )
    }
}



