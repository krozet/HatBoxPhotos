/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import $ from 'jquery';
import qs from 'qs';

import React, {Link} from 'react';
import
{
  Container,      Col,
  Button,         Form,
  FormGroup,      Label, 
  Row,            Input,
  ModalBody
} from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import axios from 'axios';

export default class SignIn extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  login()
  {
    var usr = $('#username').val();
    var pwd = $('#password').val();

    var d = qs.stringify({
      'username': usr,
      'password': pwd,
    });

    axios(
    {
      method: 'post',
      url: 'https://hatboxphotos.com/users',
      data: d,
      headers:
      {
        "Content-Type": 'application/x-www-form-urlencoded'
      }
    })
    .then(function (response)
    {
      console.log("SIGN_IN", response);
    })
    .catch(function (error)
    {
      if (error.response) 
      {
	alert("Auth failed, err-msg: " + error.response.statusText +"("+error.response.status+").");
      }
      else
      {
        alert("Auth failed, err-msg: " + error.message+".");
      }
    })
  }

  render()
  {
    return(
      <div>
          <AvForm inline>
              <AvGroup>
		<Col sm={2}><Label>Username: </Label></Col>
                <Col>
                  <AvField style={{width: 300}} type="text" name="username" id="username" required/>
                </Col>
              </AvGroup>

	      <AvGroup style={{marginTop:5}}>
		<Col sm={2}><Label>Password: </Label></Col>
                <Col>
                  <AvField style={{width: 300}} type="password" name="password" id="password" required/>
                </Col>
              </AvGroup>

	      <AvGroup style={{marginTop:15}}>
                <Col>
                  <Button onClick={this.login} style={{marginLeft:150, width:120}}>Submit</Button>
		  <a href = "#" style={{marginLeft:10, fontSize:10}}>Forgot your password?</a>
                </Col>
	      </AvGroup>
          </AvForm>
      </div>
    );
  }
}
