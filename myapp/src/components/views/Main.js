/* 
 * @author Arnold Jiadong Yu
 * @name Main
 * @package views
 * @description  Main route and also handle category and search input from searchBar
 */


import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Search from './Search';
import SearchBar from './SearchBar';
import User from './User';
import Admin from './Admin';
import axios from 'axios';


export default class Main extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        selectInput : 'All',
        searchInput: '',
        search: false,
        updateSelect: '',
        page: 1,
        pictures: [],
        strings: [],
        test: 'test',
        persons: []  
    }

        this.updateSelectFromSearchBar = this.updateSelectFromSearchBar.bind(this);
        this.updateSearchFromSearchBar = this.updateSearchFromSearchBar.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.updateSubmit = this.updateSubmit.bind(this);
        this.updateSelectFromHome = this.updateSelectFromHome.bind(this);
    };
    
    updateSearchFromSearchBar(searchInput){
        this.setState({searchInput, page:1, search:false});
    }
    updateSelectFromSearchBar(selectInput){
        this.setState({selectInput, search:false});
    }
    updatePage(page){
        this.setState({page, search:false});
    }
    updateSelectFromHome(updateSelect){
        this.setState({updateSelect, search: false});
    }
    
    updateSubmit(){
        this.setState({search:true});
    }

    
    /* componentWillMount(){

      const select = this.state.selectInput;  
      const search = this.state.searchInput;


      axios.get(`https://hatboxphotos.com/images/`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      }).catch(error=>{
              console.log(error);
          })
    }*/
        
    render(){

    return(
        <div> 

    <SearchBar  selectInput = {this.state.selectInput} 
    searchInput = {this.state.searchInput}
    updateSelect = {this.state.updateSelect}
    onChangeSelectInput = {this.updateSelectFromSearchBar} 
    onChangeSearchInput={this.updateSearchFromSearchBar}
    onChangeUpdateSelect = {this.updateSelectFromHome}
    onSearchTermSubmit= {this.updateSubmit}/>

    <Switch>
    <Route exact path ='/' render = {() => <Home updateSelect = {this.state.updateSelect} 
    onChangeUpdateSelect = {this.updateSelectFromHome} />} />
    <Route path ='/About'  component = {About} />   
    
    {/*Pass object searchInput, selectInput and search to render in Search component */}
    <Route path ='/Search' render={() => <Search searchInput = {this.state.searchInput} 
    selectInput = {this.state.selectInput} pictures = {this.state.pictures}
    strings = {this.state.persons} search = {this.state.search} page = {this.state.page} 
    onChangePage={this.updatePage} /> } />

    
            
    <Route path ='/SearchAll/:select/:page' component = {Search} />     
    <Route path ='/Search/:select/:input/:page' component = {Search} />
    
    <Route path ='/user' component = {User} />
    <Route path ='/admin' component = {Admin} />
                      
    </Switch> 
</div>

        )
}
}
