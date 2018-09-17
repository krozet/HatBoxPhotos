/* 
 * @author Arnold Jiadong Yu
 * @name Aboout
 * @package views
 * @description  About page implemented Card.js
 */


import React, { Component } from 'react';
import Card from './parts/Card';

class About extends Component {
    render() {
        return (
                <div>
          
                <h1 className = "text-center"> About our team </h1> 
                    <p></p>       
                    <div>
                        <Card />
                    </div>               
                </div>
                );
    }
};

export default About;