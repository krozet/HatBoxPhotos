/*
 * @author Arnold Jiadong Yu, Damon Li
 * @name Search
 * @package views
 * @description  Display Search Result from inpur of SearchBar
 */
import $ from 'jquery';
import qs from 'qs';
import axios from 'axios';

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import fs1 from 'fs';

import
{
  Modal,          ModalFooter,
  ModalBody,      ModalHeader
} from 'reactstrap';
import ImageDetail from './ImageDetail.js';

class Search extends Component
{
	constructor(props)
	{
                super(props);
                this.state =
		{
			modal: false,
                        select: '',
                        input: '',
			selected: [],

			categories1: {},
			categories2: {},
                        images: [],
                        List:[],
                        pageList:[],
                        pageArr:[],

                };
                this.updatePage = this.updatePage.bind(this);

                axios({
		      method: 'get',
		      url: 'https://hatboxphotos.com/categories/',
		      data: {},
		      headers:
		      {
			"Content-Type": 'application/x-www-form-urlencoded'
		      }
		   })
		   .then((rsp) =>
		   {
			var cat1 = {};
			var cat2 = {};
			var data = rsp.data.categories;
		        for(var i in data)
		        {
			   cat1[data[i].category] = data[i]._id;
		           cat2[data[i]._id] = data[i].category;
		        }
			this.state["categories1"] = cat1;
			this.state["categories2"] = cat2;
		   })
		   .catch((error) =>
		   {
			alert("Load categories failed, err-msg: " + error.message);
		   })

		axios(
		{
			method: 'get',
			url: 'https://hatboxphotos.com/images/all-thumbnails/',
			data: {},
			headers:
			{
			"Content-Type": 'application/x-www-form-urlencoded'
			}
		})
		.then((response) =>
		{
   			var all = [];
			var data = response.data.images;
			for(var i in data)
			{
			   if(data[i].image_category)
			   {
				 var path0 = data[i].image_thumbnail_path;
				 var path1 = data[i].image_medium_path;
				 var desc = data[i].image_description;
				 var cat = this.state["categories2"][data[i].image_category];

				 path0 = path0.replace(/uploads/, "images");
				 path1 = path1.replace(/uploads/, "images");

				 //console.log("SEARCH", "desc=[" + desc + "], cat=[" + cat + "], path=" + path1);

				 /* Dalu: if any search keys, match it */
				 all.push([path0, path1, desc, [cat]]);
			    }
			 }
			this.state["images"] = all;

			const select = this.props.selectInput;
	       		const input = this.props.searchInput;
			this.fetchData(select, input, "1");
		})
		.catch(function (error)
		{
			if (error.response)
			{
				alert("Load images failed, err-msg: " + error.response.statusText +"("+error.response.status+").");
			}
			else
			{
				alert("Load images failed, err-msg: " + error.message+".");
			}
		})
              this.toggle = this.toggle.bind(this);
   	}

	toggle()
	{
		this.setState({modal: !this.state.modal});
	}

	popup(i)
	{
		this.state["selected"] = this.state.pageList[i];
		this.toggle();
	}

	componentDidMount ()
	{
	        //const {select,input,page}=this.props.match.params;
	        //const {select,input,page}=this.props;
	        const select = this.props.selectInput;
	        const input = this.props.searchInput;
	        const page = this.props.page;
	        document.getElementById("exampleSelect").value=select;
		this.fetchData(select,input,page);
	}

	updatePage(event)
	{
		this.props.onChangePage(event.target.innerText);
	}


	fetchData(select,input,page)
	{
		let list = this.state.images;
		let List=[];

		var logs = "cat=" + select + ", key=" + input + ", page=" + page + ", data=" + list.length;
		console.log("SEARCH", logs);

		if(list.length)
   		{
		    for (let i=0;i<list.length;i++)
		    {
			 if(select == 'All' || select == list[i][3])
			 {
				 if(input)
				 {
					if(list[i][2].indexOf(input) >= 0)
					{
						List.push(list[i]);
					}
				 }
				 else
				 {
					List.push(list[i])
				 }
			 }
		     }

		     let pageArr = this.sliceArray(List, 6);
		     let pageList;
		     if(pageArr.length)
		     {
			   pageList=pageArr[parseInt(page)-1]
		     }
		     else
		     {
			   pageList=[]
		     }

		     this.setState({
		        List  :List,
		        pageList:pageList,
		        pageArr:pageArr,
		     })
		 }
	}


      sliceArray(array, size){
        var result = [];
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
            var start = x * size;
            var end = start + size;
            result.push(array.slice(start, end));
        }
        return result;
      }

      goPage(select,input,page){
        if(input){
                this.props.history.push(`/search/${select}/${input}/${page+1}`)
              }else{
               this.props.history.push(`/searchAll/${select}/${page+1}`)
              }

      }

      componentWillReceiveProps(nextProps) {
       // console.log( nextProps.page);
       /*  if (nextProps.location.pathname != this.props.location.pathname) {
                console.log(nextProps);
                const {select,input,page}=nextProps.match.params;

                this. fetchData( select,input,page)   ;
        }  */
        this. fetchData( nextProps.selectInput,nextProps.searchInput, nextProps.page)   ;
     }

	render()
	{
		let {List,pageList,pageArr}=this.state;

		const {select,input,page}=this.props;
		//const {select,input,page}=this.props.match.params;

		this.state.select = this.props.selectInput;
		this.state.search = this.props.searchInput;
		this.state.pictures = this.props.pictures;
		this.state.strings = this.props.strings;

		return (
		<div className="container">
		  <div>
		     <hgroup>
		       <h1>Search result</h1>
		       <h2 className="lead"><strong className="text-danger">{List.length}</strong> results were found for the search for
			 <strong className="text-danger"> {this.state.search?this.state.search:'all'} </strong>of<b className="text-danger"> {this.state.select} </b>
		       </h2>
		       <p> </p>
		     </hgroup>

		     <div>
		       <article className="search-result row">
		       {
			  pageList.map((item,i) => (
			     <div key={i} className="col-sm-7 col-md-3" style={{marginRight:5, marginTop:10}}>
				{/* Dalu: add the popup funciton */}
				<a href="javascript:void(0)" onClick={(id) => this.popup(i)}>
				   <img src={require(''+pageList[i][0]+'')} style={{width:240, height:138}}/><br/>
				   {/* Dalu: add one text line to describe this image */}
				   <span style={{fontSize:11}}>{pageList[i][2]}</span>
				</a>
			     </div>
			     ))
		       }
		       </article>
		     </div>
		  </div>

		  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
			<ModalBody><ImageDetail {...this.state}/></ModalBody>
		     </Modal>

		  <div className="container">
		  <h1></h1>
		  <ul className="pagination justify-content-center">
		  {
		       pageArr.length>1 && pageArr.map((item,i) => (
			<li key={i} className={['page-item', page-1 == i && 'active'].join(' ')} onClick ={this.updatePage} >
			    <a className="page-link" href="javascript:;">{i+1}</a>
			</li>
		    ))
		  }
		  </ul>
		 </div>
		</div>
		);
	}
};

export default withRouter(Search);
