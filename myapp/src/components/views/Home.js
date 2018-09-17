/* 
 * @author Arnold Jiadong Yu
 * @name Home
 * @package views
 * @description  Home page
 */


import React, { Component } from 'react';
import Carousel from './parts/Carousel';
import Footer from './parts/Footer';
import '../stylesheets/Home.css';
import {Container, Row, Col} from 'reactstrap';
import Nature from './parts/Pictures/Nature.jpg';
import City from './parts/Pictures/City.jpg';
import Animal from './parts/Pictures/Animal.jpg';
import Food from './parts/Pictures/Food.jpg';
import Car from './parts/Pictures/Car.jpg';
import Travel from './parts/Pictures/Travel.jpg';
import {Button} from 'reactstrap';


//style of link under each images
const style = {
    backgroundColor: 'white',
    color: 'black',
    display: 'inline-block',
    border:'0px',
    textAlign: 'center',
    textFont: '20px'
};

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
        
        this.updateSelectNature = this.updateSelectNature.bind(this);
        this.updateSelectAnimal = this.updateSelectAnimal.bind(this);
        this.updateSelectCity = this.updateSelectCity.bind(this);
        this.updateSelectFood = this.updateSelectFood.bind(this);
        this.updateSelectCar = this.updateSelectCar.bind(this);
        this.updateSelectTravel = this.updateSelectTravel.bind(this);
 
    }
    //update updateSelect variable in parent class
    updateSelectNature(){
        this.props.onChangeUpdateSelect('Nature');
    }
    updateSelectAnimal(){
        this.props.onChangeUpdateSelect('Animal');
    }
    updateSelectCity(){
        this.props.onChangeUpdateSelect('City');
    }
    updateSelectFood(){
        this.props.onChangeUpdateSelect('Food');
    }
    updateSelectCar(){
        this.props.onChangeUpdateSelect('Car');
    }
    updateSelectTravel(){
        this.props.onChangeUpdateSelect('Travel');
    }
    
    render() {
        return (
                <div>        
                    
                    <Carousel />
                    <p className = "pad"> </p>
                    
                    <Container>
                    <Row>
                        <Col className = "text-center">
                
                         <img src = {Nature} alt='' />
                        <p></p>
                        <Button style = {style} color = 'link' onClick = {this.updateSelectNature} size = 'lg'>Nature</Button>
                        </Col>
                
                        <Col className = "text-center">               
                        <img src = {Animal} />
                        <p></p>
                        <Button style = {style} color = 'link' onClick = {this.updateSelectAnimal} size = 'lg'>Animal</Button>
                        </Col>                
                        <Col className = "text-center">
                        <img src = {City} />
                        <p></p>
                        <Button style = {style} color = 'link' onClick = {this.updateSelectCity} size = 'lg'>City</Button>
                        </Col>                
                    </Row>   
                    <p></p>
                    <Row>
                        <Col className = "text-center">               
                        <img src = {Food} />
                        <p></p>
                        <Button style = {style} color = 'link' onClick = {this.updateSelectFood} size = 'lg'>Food</Button>
                        </Col>                
                        <Col className = "text-center">                
                        <img src = {Car} />
                        <p></p>
                        <Button style = {style} color = 'link' onClick = {this.updateSelectCar} size = 'lg'>Car</Button>
                        </Col>               
                        <Col className = "text-center">                
                        <img src = {Travel} />
                        <p></p>
                        <Button style = {style} color = 'link' onClick = {this.updateSelectTravel} size = 'lg'>Travel</Button>
                        </Col>  
                    </Row>  
                </Container>               
                <p> </p>
                <h3></h3>
                <Footer />
                </div>
               
        );
    }
};

export default Home;
