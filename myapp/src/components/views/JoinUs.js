/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import React, { Component } from 'react';
import Card from './parts/Card';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import ReCAPTCHA from 'react-google-recaptcha';


<script src='https://www.google.com/recaptcha/api.js'></script>



export default class JoinUs extends React.Component {
          constructor(props) {
    super(props);
    console.log(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
        
  render() {
    return (
     <div>
     <Button id="JoinUs" onClick={this.toggle}>Join Us</Button>

     <Popover placement="bottom" isOpen={this.state.popoverOpen} target="JoinUs" toggle={this.toggle}>
        <PopoverHeader>Welcome to join us!</PopoverHeader>
     <PopoverBody>
          
     <Form>
        <FormGroup row>
	  <Col sm={3}>
            <Label for="email" style={{marginTop:12}}>Email: </Label>
          </Col>
          <Col sm={8}>
            <Input type="email" name="email" id="email" placeholder="enter email" />
          </Col>
        </FormGroup>

	<FormGroup row>
	  <Col sm={3}>
            <Label for="username" style={{marginTop:12}}>Username: </Label>
          </Col>
          <Col sm={8}>
            <Input type="username" name="username" id="username" placeholder="create username" />
          </Col>
        </FormGroup>

        <FormGroup row>
	  <Col sm={3}>
            <Label for="password1" style={{marginTop:12}}>Password: </Label>
          </Col>
          <Col sm={8}>
            <Input type="password" name="password" id="password1" placeholder="create password" />
          </Col>
        </FormGroup>
  
        <FormGroup row>
          <Col sm={3}>
            <Label for="password2" style={{marginTop:12}}>Confirm: </Label>
          </Col>
          <Col sm={8}>
            <Input type="password" name="password2" id="password2" placeholder="confirm password" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="checkbox2" />{' '}
                I am at least 13 years of age
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>


        <FormGroup row>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="checkbox3" />{' '}
                <a href="#">I agree to the Terms of Agreement</a>
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="checkbox4" />{' '}
                I am not a robot
              </Label>
            </FormGroup>
          </Col>
         <div class="g-recaptcha" data-sitekey="6LfNdGgUAAAAAFoq3D8szFF4WVpcrCamASdfLlgr"></div>
        </FormGroup>
                    
        <FormGroup check row>
          <Col sm={{size:12, offset:4}}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>

      </Form>
      </PopoverBody>
      </Popover>
      </div>
    );
  }
}
