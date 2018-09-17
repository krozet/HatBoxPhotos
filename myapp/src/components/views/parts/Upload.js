/*
 * @author Arnold Jiadong Yu
 * @name Upload
 * @package parts
 * @description User upload image feature
 */


import React from 'react';
import {Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { withRouter} from 'react-router-dom';
import qs from 'qs';

const style = {
    marginLeft: 'auto',
    marginRight: 'auto'
};

class Upload extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                categories1: {},
		categories2: [],  
                category: '',
                des: '',
                comment: '',
                file: null
            };

            this.updateCategory = this.updateCategory.bind(this);
            this.updateDes = this.updateDes.bind(this);
            this.updateComment = this.updateComment.bind(this);
            this.updateFile= this.updateFile.bind(this);
            this.updateSubmit = this.updateSubmit.bind(this);
            this.refreshPage = this.refreshPage.bind(this);
	
	    axios({
                method: 'get',
                url: 'https://hatboxphotos.com/categories/',
                withCredentials: true,
                'Content-Type': 'application/json'
            }).then(rsp => {
                var cat1 = {};
		var cat2 = [];
		var data = rsp.data.categories;
	        for(var i in data)
	        {
		   cat1[data[i].category] = data[i]._id;
	           cat2.push(data[i].category);
	        }
		this.state["categories1"] = cat1;
		this.state["categories2"] = cat2;
		console.log("CAT", cat1);

		this.setState({category: cat2[0]});
            }).catch(error => {
                console.log("Upload Category error", error);
            });
        }
        
        //set category input
        updateCategory(event){
            this.setState({category: event.target.value});
        }
        //set description input 
        updateDes(event){
            this.setState({des: event.target.value});
        }
        //set comment input
        updateComment(event){
            this.setState({comment: event.target.value});
        }
        //set file input
        updateFile(event){
            this.setState({file: event.target.files[0]});
        }
        //refresh page when click cancel
        refreshPage(){
            window.location.reload();
        }
        
        //upload photo upon click on submit button
        updateSubmit()
        {
	    var fd = new FormData();
	    fd.append("image_category", this.state.categories1[this.state.category]);
	    fd.append("image_description", this.state.des);
	    fd.append("uploaded_by", 'Arnold');
	    fd.append("image", this.state.file, this.state.file.name);

            //upload photo to backend
            axios({
                method: 'post',
                url: 'https://hatboxphotos.com/images/',
		// url: 'http://127.0.0.1:8080/images',
                'Content-Type': 'multipart/form-data',
                data: fd
            }).then(function (response)
	    {
		console.log("UPLOAD", response.data);
		if(response.status && response.status === 201)
		{			
                	alert("Upload successfully! Admin will approve or decline in 24-48 hours.");
			window.location.reload();
		}
		else
		{
			alert("Upload failed, err-msg: " + response.message);
		}
            }).catch(function (error)
            {
                alert("Upload failed, err-msg: " + error.message);
            });
	    return false;
        }
        
        //get category list from backend
        componentDidMount()
        {

        }

        render(){
            return(
                    <div>
            <div style = {{textAlign :'center', marginTop: '2%' }}> <h3> Upload Photo</h3> </div>
            <Container style = {style}>
                    <AvForm style = {style}>
                    

            <AvGroup>
            <Col sm = {12} >
            <AvField label ="Category* (requried)" type ="select" name ="upload-category" id ="upload-category" onChange = {this.updateCategory} required >
            {this.state.categories2.map((item, i) => (<option>{item}</option>))}

            </AvField>
            <FormText> Please choose image category.</FormText>
            </Col>

            </AvGroup>


        <AvGroup>

          <Col sm = {12}>
          <AvField label = "Description* (required)" type="textarea" name="description" id="drscription" placeholder ="Description is used for search. " onChange = {this.updateDes} required/>
          <FormText>Please enter image description.</FormText>
          </Col>
        </AvGroup>

        <AvGroup>

          <Col sm = {12}>
          <AvField label = "Comment (option)" type="textarea" name="comment" id="comment" onChange = {this.updateComment}/>
          <FormText>Please enter comment about image.</FormText>
          </Col>
        </AvGroup>

        <AvGroup>

          <Col sm = {12}>
          <AvField label = "Image File* (required)" type="file" name="file" id="exampleFile" onChange = {this.updateFile} required />
          <FormText color="muted">
            Please choose one image you want to upload.
          </FormText>
          </Col>
        </AvGroup>
        <Row>
        <Col sm= {6}>
        <Button style = {{width: '60%',marginLeft: '20%', marginRight:'20%' }} 
            color = "danger" onClick = {this.refreshPage} > Cancel 
            </Button><FormText style = {{textAlign : 'center' }}>Press Cancel will reload the page.</FormText>
                </Col>
        <Col sm ={6}>        
                <Button style = {{width: '60%', marginLeft: '20%', marginRight:'20%'}} 
            color = "primary"  onClick = {this.updateSubmit} > Confirm</Button>
            <FormText style = {{textAlign : 'center' }}>Admin will approve or disapprove in 24-48 hours.</FormText>
            </Col>
            </Row>
            
                {/*    <Popup
                    trigger={<Button color = 'primary' block> Submit </Button>}
                    modal
                    lockScroll={false}
                    onClick = {this.toggle} >
                    {close => (
                    <div className = "text-center"><h4>Confirm submit please click Confirm. </h4>
                        <h4>Administrator will get back to you in 48 hours.</h4>
                        <h4> Otherwise, click on cancel. </h4>

                        <div >
                            <Button style = {{width: '30%',marginLeft: '10%', marginRight:'10%' }} color = "danger" onClick = {()=>{close();}} > Cancel </Button>
                            <Button style = {{width: '30%', marginLeft: '10%', marginRight:'10%'}} color = "primary"  > Confirm</Button>
                        </div>
                    </div>
                    )}
            </Popup> */}
        
        </AvForm>

                    </Container>
                    </div>

                    );
        }
};

export default withRouter(Upload);
