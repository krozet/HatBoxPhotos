/*
 * @author Arnold Jiadong Yu, Dalu Li
 * @name SearchBar
 * @package views
 * @description Searchbar will take two input, category and search, then pass it to Main.js
 */

import React from 'react';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';

import
{
  InputGroup,     InputGroupAddon,
  Input,          InputGroupButtonDropdown,
  Button,         InputGroupDropdown,
  Dropdown,       DropdownToggle,
  DropdownMenu,   DropdownItem,
  FormGroup,      Form,
  NavLink
 } from 'reactstrap';

class SearchBar extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      dropdownOpen: false,
      splitButtonOpen: false
    };

    
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.checkCharacter = this.checkCharacter.bind(this);
    this.updateSelectFromSearchBar = this.updateSelectFromSearchBar.bind(this);
    this.updateSearchFromSearchBar = this.updateSearchFromSearchBar.bind(this);
    this.updateSubmit = this.updateSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
  } 
  
  //This will block any input that is not space or characters
  checkCharacter(event){
            const re = /[a-zA-Z ]+/g;
            if(!re.test(event.key)){
                event.preventDefault();
            }
   }
   
   //Dropdown
  toggleDropDown()
  {
    this.setState({
    dropdownOpen: !this.state.dropdownOpen
  });
  }

  toggleSplit()
  {
    this.setState({splitButtonOpen: !this.state.splitButtonOpen});
  }
  
  //update select variable on parent 
  updateSelectFromSearchBar(event)
  {
      this.props.onChangeUpdateSelect(event.target.value);
      //this.props.onChangeSelectInput(event.target.value);
  }
  
  //update search variable on parent
  updateSearchFromSearchBar(event)
  {
    //this.props.onChangeSearchInput(event.target.value);
  }
  
  
  updateSelectFromChild(event)
  {
    //Dalu: this.props.onChangeSelectInput(event.target.value);
  }

  // Dalu: if the enter key is pressed, begin to search
  onSearch(event)
  {
    if(event.keyCode === 13) // enter key
    {
      console.log("ON_SEARCH", "begin to search: cat="+$('#exampleSelect').val()+", key="+$('#searchInput').val());
      
      this.props.history.push('/Search');
      this.props.onChangeSelectInput($('#exampleSelect').val());
      this.props.onChangeSearchInput($('#searchInput').val());
    }
  }

  updateSearchFromChild(event)
  {
    //Dalu: this.props.onChangeSearchInput(event.target.value);
  }
  
  //update on Submit
  updateSubmit(event)
  {
    //event.preventDefault();
    //this.props.onSearchTermSubmit();
    //this.props.history.push('/Search');  
    
    this.props.history.push('/Search');
    this.props.onChangeSelectInput($('#exampleSelect').val());
    this.props.onChangeSearchInput($('#searchInput').val());

    console.log("SEARCH_SUMBIT", "begin to search: cat="+$('#exampleSelect').val()+", key="+$('#searchInput').val());
  }
  
  render()
  {
    return(
      <div>
        <InputGroup >
          <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
          <Input type="select" name="exampleSelect" id="exampleSelect" onChange ={this.updateSelectFromSearchBar} value = {this.props.updateSelect} >
            <option>All</option>
            <option>Nature</option>
            <option>Animal</option>
            <option>City</option>
            <option>Food</option>
            <option>Car</option>
            <option>Travel</option>
          </Input>
          </InputGroupButtonDropdown>
          
          {/*<Input type = "search" name = "searchInput" id ="searchInput" placeholder="Search images: Type letters only"  value ={this.state.searchInput} */}

          {/*<div style={{margin: "auto", width: "500px"}}>*/}
          <Input type = "search" name = "searchInput" id ="searchInput" placeholder="Search images: Type letters only"  value ={this.state.searchInput} 
          onChange = {this.updateSearchFromSearchBar} onKeyDown={this.onSearch} onKeyPress = {this.checkCharacter} style={this.props.initialState}/>
          <InputGroupAddon addonType="append"><Button color="primary" onClick= {this.updateSubmit} >Search</Button></InputGroupAddon>
          
          {/*</div> style={{margin: "auto", width: "100px"}*/}
        </InputGroup>
        </div>
    );
  }
}
export default withRouter(SearchBar);
