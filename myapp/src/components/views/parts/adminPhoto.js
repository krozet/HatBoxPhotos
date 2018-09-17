/* 
 * @author Arnold Jiadong Yu
 * @name adminPhoto
 * @package parts
 * @description Admin will be able to approve or disapprove upload images from user
 */

import $ from 'jquery';
import qs from 'qs';
import axios from 'axios';

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import fs1 from 'fs';

import PhotoAdmin from './PhotoAdmin.js';

import
{
  Modal,          ModalFooter,
  ModalBody,      ModalHeader
} from 'reactstrap';


export default class managePhoto extends React.Component 
{
        constructor(props) 
	{
		super(props);
		this.state = 
		{
			page: 0,
			selected: "",

                        List:[],
                        pageList:[],
                        pageArr:[],
		}

		axios({
		        method: 'get',
		        url: 'https://hatboxphotos.com/categories/',
		        withCredentials: true,
		        'Content-Type': 'application/json'
		    })
                    .then(rsp => {
		        var cat = {};
			var data = rsp.data.categories;
			for(var i in data)
			{
			   cat[data[i]._id] = data[i].category;
			}
			console.log("CAT", cat);

			axios({
				method: 'get',
				url: 'https://hatboxphotos.com/images/pending',
				withCredentials: true,
				'Content-Type': 'application/json'
			    })
		            .then(rsp => {
				var images = []; // 0: category, 1: catid, 2: id, 3: description, 4: uploaded by, 5: uploaded time, 6: thumb path, 7: big path
				var data = rsp.data.images;
				for(var i in data)
				{
                                   var path0 = data[i].image_thumbnail_path;
				   var path1 = data[i].image_medium_path;

				   path0 = path0.replace(/uploads/, "images");
				   path1 = path1.replace(/uploads/, "images");
				
				   images.push([cat[data[i].image_category], 
						data[i].image_category, 
						data[i]._id, 
						data[i].image_description,
						data[i].uploaded_by, 
						data[i].upload_date,
						path0,
						path1]);
				}
				console.log("PENDING", images);

				var pageArr = this.sliceArray(images, images.length);    
				var pageList;
				if(pageArr.length)
				{
				   pageList = pageArr[0] 
				}
				else
				{
				   pageList = []
				}

				this.setState({
					List: images,
					pageList:pageList,
					pageArr:pageArr,
					});
			    })
		            .catch(error => {
				console.log("Download peeding images error", error);
			    });
		    })
                    .catch(error => {
		        console.log("Download categories error", error);
		    });
		
		this.updatePage = this.updatePage.bind(this);
		this.toggle = this.toggle.bind(this);
                this.do_modal = this.do_modal.bind(this);
        }

	sliceArray(array, size){
		var result = [];
		for (var x = 0; x < Math.ceil(array.length / size); x++) 
		{
			var start = x * size;
			var end = start + size;
			result.push(array.slice(start, end));
		}
		return result;
	}

	do_modal(res)
	{
		this.toggle();
		if(res)
		{
			 window.location.reload();
		}
	}

	toggle()
	{
		this.setState({modal: !this.state.modal});
	}

	updatePage(event)
	{
		this.props.onChangePage(event.target.innerText);
	}
        
        componentDidMount()
	{
            //axios.get data here and display             
        }

	popup(i)
	{
		this.state["selected"] = this.state.pageList[i];
		this.toggle();
	}
        
        render()
	{
	    let {page, List,pageList,pageArr} = this.state;
            return(
              <div className="container">
		  <div>
		     <div>
		       <article className="search-result row">
		       { 
			  pageList.map((item,i) => (
			     <div key={i} className="col-sm-7 col-md-3" style={{marginRight:5, marginTop:10}}>
				<a href="javascript:void(0)" onClick={(id) => this.popup(i)}>
				   <img src={require(''+pageList[i][6]+'')} style={{width:240, height:138}}/><br/>
				   <span style={{fontSize:9}}>[{pageList[i][0]}]: {pageList[i][3]} by {pageList[i][4]}, {pageList[i][5].substring(0, 10)}</span>
				</a>             
			     </div>
			     ))
		       }
		       </article>
		     </div>   
		  </div>

		  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
			{<ModalBody><PhotoAdmin {...this.state} do_modal={this.do_modal}/></ModalBody>}
		  </Modal>
		</div>);
        }
}
