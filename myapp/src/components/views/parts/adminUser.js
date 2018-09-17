/* 
 * @author Arnold Jiadong Yu
 * @name adminUser
 * @package parts
 * @description Admin will be able to delete user account
 */


import React from 'react';
import axios from 'axios';
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Popup from 'reactjs-popup';


export default class manageUser extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                selectUser : ' ',
                users: []
            };
            this.selectUser = this.selectUser.bind(this);
            this.deleteUser = this.deleteUser.bind(this);
        }
        
        //set selectUser input
        selectUser(event){
            this.setState({selectUser: event.target.value});
        }
        
        //delete User function here 
        deleteUser(){
            
            //get match user id number
            const selectU = this.state.selectUser;
            const user = this.state.users;
            const size = user.length;
            var selectUserId = ' ';
            for ( let i = 0; i < size; i++){
                if(user[i].email === selectU){
                    selectUserId = user[i]._id;
                }
            }
            
            console.log ("User Id", selectUserId);
            
            //send id to backend to delete user
            axios({
                method: 'post',
                url :'https://hatboxphotos.com/users/delete',
                'Content-Type': 'application/x-www-form-urlencoded',
                withCredentials: true,
                data: {_id: selectUserId}  //this might need a header too
            }).then( function (response){
                console.log("Delete User Response", response);
            }).catch(function (error){
                console.log("Delete User error", error);
            });
            
            window.location.reload();
        }
        
        //get user details from backend
        componentDidMount(){
            axios({
                method: 'get',
                url: 'https://hatboxphotos.com/users/all-users/',
                withCredentials: true,
                'Content-Type' : 'application/json'
            }).then(response =>{
                console.log("Get Response", response);  
                console.log("Get User Response", response.data.users);
                this.setState({users: response.data.users});
                
            }).catch(error =>{
                console.log("Get User error", error);
            });
        }
        
        render(){
            return(
                    <div style = {{textAlign: 'center', marginTop: '2%'}}> 
                    <Form>
                    <Col lg = {{size: 10, offset: 1}}>
                    <FormGroup>
                    <Label for="exampleSelect"><h3>Manage User</h3></Label>
                        <Input type="select" name="selectUser" id="selectUser" multiple onChange = {this.selectUser} >
                        {this.state.users.map(user => <option>{user.email}</option>)}       
                        </Input>
                    </FormGroup>
                    <Popup
                    trigger={<Button color = 'danger'style ={{width:'20%'}} > Delete </Button>}
                    modal
                    lockScroll={false}
                    onClick = {this.toggle} >
                    {close => (
                    <div className = "text-center"><h4>Are you sure you want to delete this user? </h4>
                        <h4>{this.state.selectUser}</h4>
                        <h4> Click delete to delete.</h4>
                        <h4>Otherwise, click on cancel.</h4>

                        <div >
                            <Button style = {{width: '30%',marginLeft: '10%', marginRight:'10%' }} color = "danger" onClick = {this.deleteUser} > Delete </Button>
                            <Button style = {{width: '30%', marginLeft: '10%', marginRight:'10%'}} color = "primary" onClick = {()=>{close();}} > Cancel</Button>
                        </div>
                    </div>
                    )}
                    </Popup>
                    </Col>
                    </Form>
                    </div>
                                     
                    )
        }
}
