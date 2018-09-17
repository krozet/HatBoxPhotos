/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import $ from 'jquery';
import qs from 'qs';
import axios from 'axios';

import React, {Link} from 'react';

import
{
  Button,
} from 'reactstrap';

export default class PhotoAdmin extends React.Component
{
  constructor(props)
  {
    super(props);
    var selected = props["selected"]
    // 0: category, 1: catid, 2: id, 3: description, 4: uploaded by, 5: uploaded time, 6: thumb path, 7: big path

    var path = require(''+selected[7]+'');

    this.state = 
    {
	"cat" : selected[0],
	"id"  : selected[2],
	"url" : path,
	"by": selected[4],
	"date": selected[5].substring(0, 10),
        "desc" : selected[3],
    };

    this.onDecline = this.onDecline.bind(this);
    this.onApprove = this.onApprove.bind(this);
    this.hide = this.hide.bind(this)
  }

  hide(res)
  {
    this.props.do_modal(res);
  }

  onDecline(event)
  {
    axios({
      method: 'get',
      url: 'https://hatboxphotos.com/images/set-rejected',
      data:
      {
        '_id': this.state["id"]
      },  
      headers:
      {
        "Content-Type": 'application/json'
      }
    })
    .then(rsp => {
	if(rsp.status/100 === 2)
	{
	   //alert("Decline successfully");
	   this.hide(true);
	}
	else
	{
           this.hide(false);
	   //alert("Decline failed, err-msg: " + rsp.statusText);
	}
    })
    .catch(err => {
         this.hide(false);
    	//alert("Decline failed, err-msg: " + err.message);
    })
  }

  onApprove(event)
  {
    axios({
      method: 'get',
      url: 'https://hatboxphotos.com/images/set-approved',
      data:
      {
        '_id': this.state["id"]
      },  
      headers:
      {
        "Content-Type": 'application/json'
      }
    })
    .then(rsp => {
	if(rsp.status/100 === 2)
	{
	   //alert("Approve successfully");
	   this.hide(true);
	}
	else
	{
	   //alert("Approve failed, err-msg: " + rsp.statusText);
           this.hide(false);
	}
    })
    .catch(err => {
    	//alert("Approve failed, err-msg: " + err.message);
 	this.hide(false);
    })
  }

  render()
  {
    return(
      <div>
	  <h5>{this.state["cat"]}: {this.state["desc"]} by {this.state["by"]}, {this.state["date"]}</h5>
	  <img id="image" src={this.state["url"]} width="468px" style={{marginTop:5, marginBottom:20}}/>
	  <Button onClick={this.onApprove} style={{marginLeft:42}}>Approve</Button>
	  <Button onClick={this.onDecline} style={{marginLeft:210}}>Decline</Button>
      </div>
    );
  }
}
