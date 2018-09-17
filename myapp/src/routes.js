/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { Route} from 'react-router';

/**
 * Import all page components here
 */
import App from './components/App';
import Home from './components/views/Home';
import About from './components/views/About';



/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path='/' component={App}>
    <Route path = 'Home' component={Home} />
    <Route path = 'About' component={About} />
    
  </Route>
);