/*
 * @author Arnold Jiadong Yu
 * @name SearchBar
 * @package views
 * @description  Admin Panel contains slider with functions (manage user, manage images) 
 * on the left side and different pages on the right side
 */


import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {Container, Button, Row, Col} from 'reactstrap';
import adminUser from './parts/adminUser';
import adminPhoto from './parts/adminPhoto';
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

export default class Admin extends React.Component {
        render(){
            return(
                    <div> 
                   
                    {/* slider on the left with two buttons*/}
                        <div style = {{ dispaly: "flex" ,float: 'left' ,width: '20%', height: '800px', background: 'lightgrey'}}>                                                           
                    <Row> <Button style = {style} href = '/admin/user' >  Manage User </Button>  </Row>  
                    <Row> <Button style = {style} href = '/admin/photo' >  Manage Photo  </Button> </Row>
                        </div>
                    {/* two pages linked to two button on the slider*/}
                    <div style = {{ float:'right' ,width: '80%', height: '800px'}}>
                    <Switch>               
                        <Route exact path ='/admin' component = {userHome} />
                        <Route path ='/admin/user' component = {adminUser} />
                        <Route path = '/admin/photo' component = {adminPhoto} />

                    </Switch>
                    </div>
                    
                    </div>
                    
                    
                    
                    
                    
                    )
        };
}