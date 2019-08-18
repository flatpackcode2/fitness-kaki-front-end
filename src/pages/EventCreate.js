import React from 'react';
import {
    Card,
    CardImg,
    CardText,
    Button,
    Col,
    Form,
    FormText,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap"
import axios from 'axios';
import PlacesWithStandaloneSearchBox from "../components/PlacesWithStandaloneSearchBox";
import { Link } from "react-router-dom";
import Loader from "../images/loader.gif"

class EventCreate extends React.Component {
    constructor(props) {
        super(props);
        this.imageUpload=React.createRef();
        this.state = {
            eventName: '',
            description: '',
            location: '',
            time: '',
            maxNumber: '',
            isLoading:false,
            previewImage:null,
            imageFile:null,
            message:''
        }
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value }, () => {
            //for debugging purposes, this ensures that the state is updated with the field values
            for (const key in this.state) {
                if (this.state.hasOwnProperty(key)) {
                    console.log(key + " -> " + this.state[key] + ` of data type ${typeof (this.state[key])}`);
                }
            }
        })
        console.clear()
    }

    liftMyLocationUp = locationFromGoogle => {
        this.setState({ location: locationFromGoogle })
    }

    //handleSubmit lifts up field values 
    handleSubmit = (e) => {
        let formData = new FormData()
        formData.append("image_file", this.state.imageFile, this.state.imageFile.name);
        formData.append("name", this.state.eventName);
        formData.append("description", this.state.description);
        formData.append("max_number", this.state.maxNumber);
        formData.append("time", this.state.time);
        formData.append("location", this.state.location);

        console.log('handleSubmit called')
        this.registerEvent(formData);
        setTimeout(() => this.props.history.push('/events'), 2000);
    }

    handleFile = (e) =>{
        console.log(e.target.files[0])
        this.setState({
            imageFile:e.target.files[0],
            previewImage:URL.createObjectURL(e.target.files[0]),
        })
    }

    //necessary to setState? why not just keep it as props or make ?
    registerEvent = (formData) => {
        let JWT = localStorage.getItem('userToken')
        axios.post('https://final-project-healthy.herokuapp.com/api/v1/events/',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${JWT}`
                }
            }
        ).then(response => {
            if (response.data.success){
                console.log(response.data.success)
            }
        }).catch(error => {
            console.log("ERROR in request: ", error);
        })
    }

    handleClick = () =>{
        this.imageUpload.current.click();
    }

    render() {
        const { event_name, description, location, max_number, time, isLoading, previewImage, imageFile, message } = this.state
        return (
            <div>
                <h3 className="text-center">Create Your Event Here:</h3>
                <Row className="d-flex justify-content-center">
                    <Col md="4" sm="6" className="d-flex justify-content-end">
                        <Form className=" w-75">
                            <FormGroup>
                                <Label for="eventName">Event Name:</Label>
                                <Input id="eventName" type="text" value={event_name} onChange={this.handleChange} placeholder="Give me a name"></Input>
                                <Label for="description">Description:</Label>
                                <Input id="description" type="text" value={description} onChange={this.handleChange} placeholder="Share what I'm about"></Input>
                                <Label for="location">Location:</Label>
                                {/* <PlacesWithStandaloneSearchBox liftMyLocationUp={this.liftMyLocationUp} /> */}
                                <Input id="location" type="text" value={location} onChange={this.handleChange} placeholder="Tell folks where to find me"></Input>
                                <Label for="time">Time:</Label>
                                <Input id="time" type="datetime-local" value={time} onChange={this.handleChange}></Input>
                                <Label for="maxNumber">Max Number:</Label>
                                <Input id="maxNumber" type="number" min="0" value={max_number} onChange={this.handleChange} placeholder="It's always better with company"></Input>
                                <div>&nbsp;</div>
                            </FormGroup>
                        </Form>
                    </Col>


                    <Col md="4" sm="6">
                        <Row>
                        <FormGroup>
                        <Label className="d-block">Upload your event image here:</Label>
                            <div id="image-preview" onClick={this.handleClick}>

                                <Card style={{width:"300px", height:"300px"}} className="d-flex justify-content-center align-items-center">
                                    {/* Set loading icon when uploading picture. nested ternary operator. */}
                                    {!isLoading?(!imageFile?(<h4 className="text-center">{message ? message : "Live Preview"}</h4>):(<CardImg src={previewImage} height="300px" width="300px"/>)):<Loader/>}
                                </Card>
                            </div>
                            <input id="upload" style={{display:"none"}} type="file" accept="image/*" multiple={false} name="image-file" ref={this.imageUpload} id="imageFile" onChange={this.handleFile}></input>
                        </FormGroup>
                            <FormGroup>
                            <div id="image-submit-form">
                                    <Row >
                                        <Col md={12} sm={12}>
                         

                                        </Col>
                                    </Row>
                            </div>
                            </FormGroup>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button type="submit" outline color="primary" onClick={this.handleSubmit}><Link to={'/events'}>Create Event</Link></Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default EventCreate;