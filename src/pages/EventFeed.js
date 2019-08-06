import React from 'react';
import {Button,
    Row,
    Col,
    CardBody,
    CardSubtitle,
    Container,
    CardText,
    Progress
    } from 'reactstrap';
import axios from 'axios';

class EventFeed extends React.Component{
    constructor(props){
        super(props);
        this.state={
            message:true,
            eventsList:[]
        }
    }

    //retrieve all events via axios
    componentDidMount(){
      console.log('MUAHAHAHA')
      axios.get('https://final-project-healthy.herokuapp.com/api/v1/events/')
      .then(response =>{ 
        console.log('****');
        console.log(response);
        let tempEventList = response.data;
        this.setState({eventsList:tempEventList});
      })
      .catch(error=>{
        console.log('ERROR: ', error);
      })
    }

    render(){
        const {eventsList} = this.state;
        console.log("eventsList is", eventsList)
        return(
          <div>
            <div>
              <h1>This Heading is in EventFeed.js</h1>
                {eventsList.map((eventInList) => {
                  return(
              <Container className="my-2">
                <Button color="danger">
                  <Row md="10" className="d-flex align-items-center rounded">
                    <Col md="3" className =" d-flex justify-content-center align-item-center rounded">
                      <img width="100%" className="border border-white p1 rounded" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Capitals-Maple_Leafs_%2834075134291%29.jpg" alt="event image"/>
                    </Col>
                    <Col md="9" className="rounded">
                      <CardBody className="p-1 text-left">
                        <div className="event-title"><h3>{eventInList.name}</h3></div>
                        <CardSubtitle>{eventInList.description}</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <CardText>This is a card text but I will need to put the hosts picture here</CardText>
                        <div className="text-center">Capacity: {eventInList.max_guests} (this is just text for now)</div>
                        <Progress color ="success" value="25" />
                      </CardBody>
                    </Col>
                  </Row>
                </Button>
              </Container>)
                })
                }
            </div>
          </div>
        )
      }

}

//create an event

export default EventFeed;