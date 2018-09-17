/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import $ from 'jquery';
import qs from 'qs';

import React, {Link} from 'react';

export default class ImageDetail extends React.Component
{
  constructor(props)
  {
    super(props);
    var selected = props["selected"]
    var path0 = require(''+selected[0]+'');
    var path1 = require(''+selected[1]+'');

    this.state = 
    {
	"url" : path1,
        "desc" : selected[2],
    };
  }

  render()
  {
    return(
      <div>
	  <h5>{this.state["desc"]}</h5>
	  <img id="image" src={this.state["url"]} width="468px" style={{marginTop:5, marginBottom:20}}/>
          <a href={this.state["url"]} download="Favourite image" >Download</a>
      </div>
    );
  }
}
