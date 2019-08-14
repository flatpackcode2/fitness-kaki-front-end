import React, { Component } from "react";
import { file } from "@babel/types";
import { Link } from 'react-router-dom'
import './Upload.css'

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            imageFile: null,
            names: [],
        };
    }

    toData = (url, callback) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            const reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    };

    toDataFromFile(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
    };

    // predict_click = (value, source) => {
    //     let preview = $(".food-photo");
    //     let imageFile = document.querySelector("input[type=file]").files[0];

    predictImage = (e) => {
        let image = '';
        this.toData(e.target.value, (myBase64) => {
            image = myBase64 // myBase64 is the base64 string
        }
        )


        setTimeout(() => {
            console.log(image.split(',')[1])
            // Initialise Clarifai api
            const Clarifai = require('clarifai');

            const app = new Clarifai.App({
                apiKey: '3136bd99f12649ddb3bbd963c2975804'
            });

            // Identify the image
            app.models.predict(Clarifai.FOOD_MODEL, { base64: image.split(',')[1] })
                .then((response) =>
                    // console.log(response.outputs[0].data)
                    this.setState({
                        names: response.outputs[0].data.concepts
                    })
                )
                .catch((err) => console.log(err))
            this.state.names.map(p => (
                console.log(p.name)
            ))

        }, 1000)
    }

    predictImageFile = (f) => {
        let imageFile = document.querySelector("input[type=file]").files[0];
        this.toDataFromFile(imageFile, (myBase64) => {
            imageFile = myBase64 // myBase64 is the base64 string
        }
        )


        setTimeout(() => {
            console.log(imageFile)
            // console.log(imageFile.split(',')[1])
            // Initialise Clarifai api
            const Clarifai = require('clarifai');

            const app = new Clarifai.App({
                apiKey: '3136bd99f12649ddb3bbd963c2975804'
            });

            // Identify the image
            app.models.predict(Clarifai.FOOD_MODEL, { base64: imageFile.split(',')[1] })
                .then((response) =>
                    // console.log(response.outputs[0].data)
                    this.setState({
                        names: response.outputs[0].data.concepts
                    })
                )
                .catch((err) => console.log(err))
            this.state.names.map(p => (
                console.log(p.name)
            ))

        }, 1000)
    }


    render() {
        return (
            < div className="wrapper" >
                <form  >
                    <h1 class="word">Please insert an URL of picture and wait for the result</h1>
                    <div className="form-URL" >
                        <input onChange={e => this.predictImage(e)} name="image" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="" placeholder="Select URL" />
                    </div>
                    <br></br>
                    <h1 class="word">Or insert a food picture that you have saved</h1>
                    <br></br>
                    <input className="add-picture"
                        type="file"
                        id="imageFile"
                        name='imageFile'
                        onChange={f => this.predictImageFile(f)} />
                </form>
                {
                    this.state.names.slice(0, 5).map((name, key) =>
                        <b><Link className="text-light" to={`/nutrition/${name.name}`}>{name.name}</Link></b>

                    )
                }
            </div >
        );
    }
}


export default Upload;