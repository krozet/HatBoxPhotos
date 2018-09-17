/* 
 * @author  Arnold Jiadong Yu
 * @name User
 * @package views
 * @description User Panel contains slider with functions (upload) on the left side and different pages on the right side
 */


import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Container, Button, Row, Col} from 'reactstrap';
import Upload from './parts/Upload';
import userHome from './parts/userHome';

//button style on slider
const style = {  
    width: "60%",
    padding: '10px 20px' ,
    margin: '30px auto 30px auto ',
    textAlign: 'center',
    display: 'block',
    fontSize: '20px',
    overflow: 'hidden',
    linHheight: '30px',
    position: 'relative',
    color: 'white',
    borderRadius: '8px',
    backgroundColor: '#25A9E2'
    
};

export default class Photographer extends React.Component {
        render(){
            return(
                    <div> 
                        <div style = {{ dispaly: "flex" ,float: 'left' ,width: '20%', height: '800px', background: 'lightgrey'}}>                
                            <Row> <Button style = {style} href = '/user/upload' >  Upload  </Button> </Row>
                        </div>
                        <div style = {{ float:'right' ,width: '80%', height: '800px'}}>
                            
                            
                        <Switch>
                            <Route exact path ='/user' component = {userHome} />
                            <Route path ='/user/upload' component = {Upload} />                       
                        </Switch>
                        </div>                   
                    </div>             
                    )
        }
}