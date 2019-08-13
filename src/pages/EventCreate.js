import React from 'react';
import {
        Button,
        Col,
        Form,
        FormGroup,
        Input,
        Label,
        Row,
    } from "reactstrap"
import axios from 'axios';
import PlacesWithStandaloneSearchBox from "../components/PlacesWithStandaloneSearchBox";

class EventCreate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            eventName:'',
            description:'',
            location:'',
            host:'',
            time:'',
            maxNumber:''
        }
    }

    handleChange = e =>{
        this.setState({[e.target.id]:e.target.value}, ()=>{
        //for debugging purposes, this ensures that the state is updated with the field values
        for (const key in this.state){
            if (this.state.hasOwnProperty(key)){
                console.log(key + " -> " + this.state[key] + ` of data type ${typeof(this.state[key])}`);
            }
        }
        })
        console.clear()
    }

    liftMyLocationUp = locationFromGoogle =>{
        this.setState({location:locationFromGoogle})
    }

    //handleSubmit lifts up field values 
    handleSubmit = (e) =>{
        //handleSubmit needs to preventDefault as button is inside form.
        e.preventDefault();
        console.log('handleSubmit called')
        let eventDetails={
            name:this.state.eventName,
            description:this.state.description,
            location:this.state.location,
            // host:this.state.host,
            host:2,
            max_number:parseInt(this.state.maxNumber),
            time:this.state.time
        }
        this.registerEvent(eventDetails=eventDetails);
    }

    //necessary to setState? why not just keep it as props or make ?
    registerEvent = (eventDetails) =>{
        console.log('registerEvent called');
        console.log('Below is the value for eventDetails');
        console.log(eventDetails);
        axios.post('https://final-project-healthy.herokuapp.com/api/v1/events/',
            JSON.stringify(eventDetails),
            { headers: {'content-type': 'application/json'
            // 'Authorization': `Bearer ${JWT}`
        }}
        ).then(response =>{
            console.log(response);
        }).catch(error =>{
            console.log("ERROR in request: ", error);
        })
    }

    // name:eventDetails.name,
    // description:eventDetails.description,
    // location:eventDetails.location,
    // host:eventDetails.host,
    // time:eventDetails.time,
    // maxNumber:eventDetails.maxNumber


    // createEvent=() => {
    //     this.setState(
    //         {}
    //     )
    // }

    render(){
        const {event_name, description, location, max_number, time} = this.state
        return(
            <div>
                <h3 className="text-center">Create Your Event Here:</h3>
                <Row className="d-flex justify-content-center">
                    <Col md="6">
                        <Form>
                            <FormGroup>
                                <Label for="eventName">Event Name:</Label>
                                <Input id="eventName" type="text" value={event_name} onChange={this.handleChange} placeholder="Give me a name"></Input>
                                <Label for="description">Description:</Label>
                                <Input id="description" type="text" value={description} onChange={this.handleChange} placeholder="Share what I'm about"></Input>
                                <Label for="location">Location:</Label>
                                <PlacesWithStandaloneSearchBox liftMyLocationUp={this.liftMyLocationUp}/>
                                {/* <Input id="location" type="text" value={location} onChange={this.handleChange} placeholder="Tell folks where to find me"></Input> */}
                                <Label for="time">Time:</Label>
                                <Input id="time" type="datetime-local" value={time} onChange={this.handleChange}></Input>
                                <Label for="maxNumber">Max Number:</Label>
                                <Input id="maxNumber" type="number" min="0" value={max_number} onChange={this.handleChange} placeholder = "It's always better with company"></Input>
                                <div>&nbsp;</div>
                                <Button type="submit" outline color = "primary" onClick={this.handleSubmit}>Create Event</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EventCreate;