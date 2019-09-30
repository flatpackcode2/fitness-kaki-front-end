import React from 'react';
import {
  Button,
  Row,
  Col,
  CardBody,
  CardSubtitle,
  Container,
  CardText,
  CardTitle,
  Progress,
} from 'reactstrap';
import axios from 'axios';
import Loader from '../images/loader.gif';
import { Link } from "react-router-dom";
import nightWorkout from "../images/nightWorkout.jpg";

class EventFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: true,
      eventsList: [],
      isLoading: true,
      eventsJoined:0
    }
  }

  //retrieve all events via axios
  componentDidMount() {
    setInterval(()=>{
      axios.get('https://final-project-healthy.herokuapp.com/api/v1/events/')
        .then(response => {
          let tempEventList = response.data;
          this.setState({ eventsList: tempEventList, isLoading: false })
        })
        .catch(error => {
          console.log('ERROR: ', error);
        })
    }, 1000)
  }

  refreshFeed = () =>{
    axios.get('https://final-project-healthy.herokuapp.com/api/v1/events/')
      .then(response => {
        let tempEventList = response.data;
        this.setState({ eventsList: tempEventList, isLoading: false })
      })
      .catch(error => {
        console.log('ERROR: ', error);
      })
  }

  componentDidUpdate(){
    this.refreshFeed();
  }

  //this function allows the user to join or leave an event
  handleSubmit = e =>{
    //make an api call to guestlist and add or delete current user to guest list
    let event_id = e.target.id
    let JWT = localStorage.getItem('userToken')
    axios.post('https://final-project-healthy.herokuapp.com/api/v1/guestlists/',
    {event_id:event_id},
      {
        headers:{
            Authorization: `Bearer ${JWT}`
            }
      }
    ).then(response => {
      this.refreshFeed();
  }).catch(error => {
      console.log("ERROR in request: ", error)
  })
}

  render() {
    const { eventsList, isLoading } = this.state;
    return (
      <div style={{backgroundImage: `url(${nightWorkout})`, backgroundSize:'cover', backgroundAttachment:'fixed', height:'100wh'}}>
        <div>
          <h1 className="text-center text-light shadow">Events Near You</h1>
          <h4 className="text-center text-light shadow">Don't see a fitness meet you like? How about <Link to={'/events/create'}>creating your own</Link>?</h4>
          {isLoading ?
            <Container>
              <Row className="d-flex align-items-center justify-content-center">
                <img src={Loader} alt="Loading event feed" />
              </Row>
            </Container>
            :

            eventsList.map((eventInList) => {
              return (
                <Container key={eventInList.id} className="my-2 bg-none">
                    <Row md="10" className="d-flex align-items-center rounded bg-info" style={{opacity:'0.9'}}>
                      <Col md="4" className=" d-flex justify-content-center align-item-center rounded">
                        <img width="200px" height="200px" className="border border-white m-3 rounded justify-content-center" src={eventInList.image} alt="event image" />
                      </Col>
                       <Col md="8" className="rounded">
                        <CardBody className="p-1 text-left">
                          <CardTitle><h3 className='text-light'>{eventInList.name}</h3></CardTitle>
                          <CardSubtitle className='text-light'>{eventInList.time}</CardSubtitle>
                          <CardText className='text-light'>Host : {eventInList.host.username}</CardText>
                          <CardText className='text-light'>Location:{eventInList.location}<br/>What to expect:{eventInList.description}</CardText>
                          <CardText className="text-light">Capacity: {eventInList.guests.length}/{eventInList.max_number}</CardText>
                          <Row className="align-items-center">
                            <Col md="8">
                              <Progress color="success" value={Math.floor(eventInList.guests.length/eventInList.max_number*100)} />
                            </Col>
                            <Col md="4">
                            {eventInList.guests.includes(this.props.current_user.id)
                               ?
                                <Button id={eventInList.id} color="danger" onClick={this.handleSubmit}>Leave</Button>
                              :
                                <Button id={eventInList.id} color="success" onClick={this.handleSubmit}>Join</Button>
                            }
                            </Col>
                          </Row>
                        </CardBody>
                      </Col>
                    </Row>
                </Container>)
            })

          }

        </div>
      </div>
    )
  }
}

export default EventFeed;