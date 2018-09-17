/* 
 * 
 * @author Arnold Jiadong Yu
 * @name CSC648
 * @package parts
 * @description Required text of csc648 class
 */

/* global center */

import React from 'react';
import {Alert,Navbar} from 'reactstrap';
export default class CSC648 extends React.Component {
    render() {
        return (
                <div>
                    <Navbar color ="secondary" style = {{text: "center"}}>
                        <div className = "text-center">
                        SFSU Software Engineering Project CSC 648-848 Summer 2018 Summer 2018 For Demonstration Only
                        </div>
                    </Navbar>
                </div>

                );
    }
}