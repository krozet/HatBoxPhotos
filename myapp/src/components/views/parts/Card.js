/* 
 * 
 * @author Arnold Jiadong Yu, Amelia Rawlings
 * @name Card
 * @package parts
 * @description Details about each member profiles.
 */
import React, { Component } from 'react';

import
{
  NavLink,        Card, 
  CardImg,        CardText, 
  CardBody,       Modal, 
  ModalHeader,    ModalBody, 
  ModalFooter,    CardTitle, 
  CardSubtitle,   Button,
  Row,            Col,
  Container,      Popover,
  PopoverHeader,  PopoverBody
} from 'reactstrap';
import TeamLead from './Pictures/TeamLead.png';
import FrontendLead from './Pictures/FrontendLead.png';
import BackendLead from './Pictures/BackendLead.png';
import Front1 from './Pictures/Front1.png';
import Front2 from './Pictures/Front2.png';
import Back1 from './Pictures/Back1.png';
import Back2 from './Pictures/Back2.png';

export default class Example extends React.Component
{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      modal: false,  
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      modal7: false,
      
    };
  }
  
  toggle()
  {
    this.setState
    ({
      modal: !this.state.modal,
      modal1: !this.state.modal1,
      modal2: !this.state.modal2,
      modal3: !this.state.modal3,
      modal4: !this.state.modal4,
      modal5: !this.state.modal5,
      modal6: !this.state.modal6,
      modal7: !this.state.modal7
    });
  }
  
  closeModal(tabId)
  {
    this.setState({[tabId]: false});
  }
  
  showModal(modal)
  {
    this.setState({[modal]: true});
    console.log(this.state);
  }
  
  render()
  { 
    return(
      <Container>
        <Row>
          <Col sm={{ size :4, offset:4}}> 
            <div>
              <Card style = {{ alignSelf: 'center', height: '100%', width: '100%'}}>
                <CardImg style = {{ alignSelf: 'center', height: '100%', width: '100%'}} bottom width="50%" src={TeamLead} alt="Card image cap" />
                <CardBody>
                  <CardTitle>Amelia Rawlings</CardTitle>
                  <CardSubtitle>Team Lead</CardSubtitle>
                  <CardText></CardText>
                  <Button color = "info" onClick = {this.showModal.bind(this, 'modal1')}>More</Button>
                  <Modal isOpen = {this.state.modal1} toggle={this.closeModal.bind(this, 'modal1')} className={this.props.className} >
                    <ModalHeader toggle={this.closeModal.bind(this, 'modal1')}>More about Me</ModalHeader>
                    <ModalBody>
                    I chose to move into computer science after performing rudimentary automation in my previous career and discovering that I had a strong passion for developing and creating applications that made the day-to-day life a easier.  I have spent the past few years working towards my goal of a Bachelor's Degree in Computer Science and have picked up an Associate’s in CS along the way.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="link" href ="https://www.linkedin.com/in/ameliarawlings/" >LinkedIn</Button>{' '}
                      <Button color="link" href = "https://github.com/AmeliaRawlings"> Github </Button>
                    </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
        <p></p>
        
        <Row>
          <Col sm={{ size : 4, offset:1}}>
            <div>
              <Card style = {{ alignSelf: 'center', height: '100%', width: '100%'}}>
                <CardImg style = {{ alignSelf: 'center', height: '100%', width: '100%'}} top width="50%" src={FrontendLead} alt="Card image cap" />
                <CardBody>
                  <CardTitle>Arnold Jiadong Yu</CardTitle>
                  <CardSubtitle>Frontend Lead</CardSubtitle>
                  <CardText></CardText>
                  <Button color = "info" onClick = {this.showModal.bind(this, 'modal2')}>More</Button>
                  <Modal isOpen = {this.state.modal2} toggle={this.closeModal.bind(this, 'modal2')} className={this.props.className} >
                    <ModalHeader toggle={this.closeModal.bind(this, 'modal2')}>More about Me</ModalHeader>
                    <ModalBody>
                      I am a Senior at San Francisco State University studying both computer science and mathematics. My goal is to continue my master or even phd in the field of 
                    mathematics, data science, machine learning, or AI.
                    </ModalBody>
                    <ModalFooter>
                      <Button color="link" href ="https://www.linkedin.com/in/arnold-jiadong-yu-3b5751147/" >LinkedIn</Button>{' '}
                      <Button color="link" href = "https://github.com/jyu13"> Github </Button>
                    </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </div>
          </Col>

          <Col sm={{ size :4, offset:2}}>
            <div>
              <Card style = {{ alignSelf: 'center', height: '100%', width: '100%'}}>
                <CardImg  style = {{ alignSelf: 'center', height: '100%', width: '100%'}} top width="50%" src={BackendLead} alt="Card image cap" />
                <CardBody>
                  <CardTitle>Keawa Rozet</CardTitle>
                  <CardSubtitle>Backend Lead</CardSubtitle>
                  <CardText></CardText>
                  <Button color = "info" onClick = {this.showModal.bind(this, 'modal3')}>More</Button>
                  <Modal isOpen = {this.state.modal3} toggle={this.closeModal.bind(this, 'modal3')} className={this.props.className} >
                    <ModalHeader toggle={this.closeModal.bind(this, 'modal3')}>More about Me</ModalHeader>
                    <ModalBody>
                      <h6>SFSU Senior with experience in Andriod App development, Game development (UE4), and Audio Plugin development. </h6>
                      <h6>Favorite language: C++ </h6>
                      <h6>Favorite Villian: Cersei Lannister (Game of Thrones) </h6>
                      <h6>Favorite League of Legends Champ: Zac </h6>
                    </ModalBody>    
                    <ModalFooter>
                      <Button color="link" href ="https://www.linkedin.com/in/keawa/" >LinkedIn</Button>{' '}
                      <Button color="link" href = "https://github.com/krozet"> Github </Button>
                    </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
        <p></p>

        <Row> 
          <Col sm='3'>
            <div>
              <Card style = {{ alignSelf: 'center',height: '100%', width: '100%'}}>
                <CardImg style = {{ alignSelf: 'center', height: '100%', width: '100%'}} top width="50%" src={Front1} alt="Card image cap" />
                <CardBody>
                  <CardTitle>Dalu Li</CardTitle>
                  <CardSubtitle>Frontend</CardSubtitle>
                  <CardText></CardText>
                  <Button color = "info" onClick = {this.showModal.bind(this, 'modal4')}>More</Button>
                  <Modal isOpen = {this.state.modal4} toggle={this.closeModal.bind(this, 'modal4')} className={this.props.className} >
                    <ModalHeader toggle={this.closeModal.bind(this, 'modal4')}>More about Me</ModalHeader>
                    <ModalBody>
                      <h6>SFSU Senior student with experiencein iOS App development, Game development (Unity), Data Base and Server.</h6>
                      <h6>Favorite language: Java, C#.</h6>
                      <h6>Hobby: Video shooting, PhotographFavorite </h6>
                      <h6>Game: FIFA Soccer.</h6>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="link" href ="https://www.linkedin.com/feed/?trk=onboarding-landing" >LinkedIn</Button>{' '}
                      <Button color="link" href = "https://github.com/dalu54"> Github </Button>
                    </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col sm='3'>
            <div>
              <Card style = {{ alignSelf: 'center', height: '100%', width: '100%'}}>
                <CardImg style = {{ alignSelf: 'center', height: '100%', width: '100%'}} top width="50%" src={Front2} alt="Card image cap" />
                <CardBody>
                  <CardTitle>Betty Reaney </CardTitle>
                  <CardSubtitle>Frontend</CardSubtitle>
                  <CardText></CardText>
                  <Button color = "info" onClick = {this.showModal.bind(this, 'modal5')}>More</Button>
                  <Modal isOpen = {this.state.modal5} toggle={this.closeModal.bind(this, 'modal5')} className={this.props.className} >
                    <ModalHeader toggle={this.closeModal.bind(this, 'modal5')}>More about Me</ModalHeader>
                    <ModalBody>I am a Senior at San Francisco State University studying Computer Science. I currently work as a Technical Specialist at the Apple Store and have for the past 3 years. More recently I have been assisting the Genius Bar team doing Admin work. I am interested in AI and would love to get a job in this field one day.     </ModalBody>
                    <ModalFooter>
                      <Button color="link" href ="https://www.linkedin.com/in/betty-reaney-238b6a165/" >LinkedIn</Button>{' '}
                      <Button color="link" href = "https://github.com/bettyreaney"> Github </Button>
                    </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col sm='3'>
            <div>
              <Card style = {{ alignSelf: 'center', height: '100%', width: '100%'}}>
                <CardImg  style = {{ alignSelf: 'center', height: '100%', width: '100%'}} top width="50%" src={Back1} alt="Card image cap" />
                <CardBody>
                  <CardTitle>U Keong Cheong</CardTitle>
                  <CardSubtitle>Backend</CardSubtitle>
                  <CardText></CardText>
                  <Button color = "info" onClick = {this.showModal.bind(this, 'modal6')}>More</Button>
                  <Modal isOpen = {this.state.modal6} toggle={this.closeModal.bind(this, 'modal6')} className={this.props.className} >
                    <ModalHeader toggle={this.closeModal.bind(this, 'modal6')}>More about Me</ModalHeader>
                    <ModalBody>Ray is a Computer Science student at San Francisco State University, expected to graduate in Spring 2019. He was born in China and moved to the U.S. in 2006. He can speak English, Mandarin and Cantonese. He enjoys developing games as much as playing them. He had some experience in software and web development as an assistant of a freelance developer.      </ModalBody>
                    <ModalFooter>
                      <Button color="link" href ="https://www.linkedin.com/in/u-keong-ray-cheong-766b70165" >LinkedIn</Button>{' '}
                      <Button color="link" href = "https://github.com/cukray"> Github </Button>
                    </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col sm='3'>
            <div>
              <Card style = {{ alignSelf: 'center',height: '100%', width: '100%'}}>
              <CardImg style = {{ alignSelf: 'center', height: '80%', width: '100%'}} top width="50%" src={Back2} alt="Card image cap" />
              <CardBody>
                <CardTitle>Albert Du</CardTitle>
                <CardSubtitle>Backend</CardSubtitle>
                <CardText></CardText>
                <Button color = "info" onClick = {this.showModal.bind(this, 'modal7')}>More</Button>
                <Modal isOpen = {this.state.modal7} toggle={this.closeModal.bind(this, 'modal7')} className={this.props.className} >
                  <ModalHeader toggle={this.closeModal.bind(this, 'modal7')}>Developer Albert</ModalHeader>
                  <ModalBody>
                    <h6>Albert.major = “Computer Science”;</h6>
                    <h6>Albert.university = “San Francisco State University”;</h6>
                    <h6>Albert.class = “Senior”</h6>
                    <h6></h6>
                    <h6>Albert.interest1 = “cyber security”;</h6>
                    <h6>Albert.interest2 =  “sports statistics”; </h6>
                    <h6>Albert.interest3 = “databases”;</h6>
                    <h6></h6>      
                    <h6>Albert.hobby1 = “listening to music”;</h6>
                    <h6>Albert.hobby2 =  “video games”;</h6>
                    <h6></h6>
                    <h6>Albert.slogan = “Just Du It!”; </h6>      
                  </ModalBody>
                  <ModalFooter>
                    <Button color="link" href ="https://www.linkedin.com/in/albert-du" >LinkedIn</Button>{' '}
                    <Button color="link" href = "https://github.com/adu19"> Github </Button>
                  </ModalFooter>
                  </Modal>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
        <p></p>
      </Container>
      );
    };
  };