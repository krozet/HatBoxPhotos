/* 
 * @auther Amelia Rawlings 
 * @name SignIn
 * @package parts
 * @description
 */

import React from 'react';
import
{
  Row,            Col,
  Button,         Modal, 
  ModalHeader,    ModalBody, 
  ModalFooter
} from 'reactstrap';
import SignInForm from '../SignInForm.js';
import JoinUs from '../JoinUs.js';

export default class SignIn extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {modal: false};
    this.toggle = this.toggle.bind(this);
  }

  toggle()
  {
    this.setState({modal: !this.state.modal});
  }

  render()
  {
    return(
      <div>
        <Button id="Sign In" color="dark"  size = "sm" onClick={this.toggle}>Sign In</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Sign In</ModalHeader>
          <ModalBody>
            <SignInForm></SignInForm>
          </ModalBody>
          <ModalFooter>
            Don't have an account?
            <span></span>
            <a href = 'JoinUs'>Join Us</a>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}