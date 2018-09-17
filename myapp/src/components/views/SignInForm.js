/* 
 * @author  Amelia Rawlings, Betty Reaney
 * @name SignInForm
 * @package views
 * @description  
 */

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

export default class SignInForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { username:'', password: ''}
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }
  updateUsername(event)
  {
    this.setState({username: event.target.value});
  }
  updatePassword(event)
  {
    this.setState({password: event.target.value});
  }
  submitForm()
  {
    const fd = new FormData();
    fd.append('username',this.state.username);
    fd.append('password', this.state.password);
    
    console.log("FormData", fd);
    axios(
    {
      method: 'post',
      url: 'https://hatboxphotos.com/users/',
      data:
      {
        'username': this.state.username,
        'password': this.state.password,
      },  
      headers:
      {
        "Content-Type": 'application/json'
      }
    })
    .then(function (response)
    {
      console.log("Response", response);
    })
    .catch(function (error)
    {
      console.log("Post error", error);
    })
  }
  render()
  {
    return(
      <div>
          <div>
        <Container>
          <Form inline>
              <FormGroup row className="mb-2 mr-sm-2 mb-sm-0">
                <Col sm={{ size :2, offset:0}}>
                  <Label>Email</Label>
                </Col>
                <Col>
                  <Input type="email" name="username" placeholder="example@gmail.com" onChange={this.updateUsername.bind(this)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-2 mr-sm-2 mb-sm-0">
                <Col sm={{ size :2, offset:0}}>
                  <Label>Password</Label>
                </Col>
                <Col>
                  <Input type = "password" name = "password" id = "examplePassword" placeholder = "Example123" onChange={this.updatePassword.bind(this)}/>
                </Col>
              </FormGroup>
            <p></p>
            <Row>
            <a href =   "#">Forgot your password?</a>
            <Button onClick= {this.submitForm("username", "password")}>Submit</Button>
            </Row>
          </Form>
        </Container>
      </div>
      </div>
    );
  }
}
