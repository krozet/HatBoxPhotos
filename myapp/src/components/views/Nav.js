/* 
 * @author Arnold Jiadong Yu, Amelia Rawlings, Betty Reaney
 * @name Nav
 * @package views
 * @description  Navgation Bar contais Sign In, Sign Up, About 
 */
import React from 'react';
import{
  Collapse,       Navbar,
  NavbarToggler,  NavbarBrand,
  Nav,            NavItem,
  NavLink,        UncontrolledDropdown,
  DropdownToggle, DropdownMenu,
  DropdownItem,   Button,
  Modal,          ModalFooter,
  ModalBody,      ModalHeader
} from 'reactstrap';
import {Link} from 'react-router-dom';
import SignIn from './SignIn.js';
import JoinUs from './JoinUs.js';

export default class Example extends React.Component
{
  constructor(props)
  {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {modal: false};
  }
  toggle()
  {
      console.log("NAV", "sign in is pressed...");
      this.setState({modal: !this.state.modal});
  }
  render()
  {
    return(
      <div>
        <Navbar color="dark" className  ="navbar-dark navbar-expand-sm" expand="md" size= "ml">
          <NavbarBrand href="/">HatBoxPhoto</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
		<NavLink>
		  <Button color = "dark" onClick = {this.toggle} >Sign In</Button>
		  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
		   <ModalHeader toggle={this.toggle}>Sign In</ModalHeader>
		   <ModalBody><SignIn /></ModalBody>
		   <ModalFooter><p>Not a member?<a href = '/'>Join us</a></p></ModalFooter>
		  </Modal>
		</NavLink>
	      </NavItem>
              <NavItem>  
                <NavLink>            
                  <JoinUs/>
                </NavLink>  
              </NavItem>
              <NavItem><NavLink>  <Button href = '/admin' >Admin</Button></NavLink>  </NavItem> 
              <NavItem><NavLink>  <Button href = '/user' >User</Button></NavLink>  </NavItem> 
              <NavItem><NavLink>   <Button href = '/About' >About</Button></NavLink>  </NavItem> 
              
              {/*<UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <Button color = "dark" >More</Button>
                </DropdownToggle>
                <DropdownMenu  right>
                    <DropdownItem href="/About"> About </DropdownItem>
                    <DropdownItem href = '/user'> User </DropdownItem>
                    <DropdownItem href = '/admin'> Admin </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>*/}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
