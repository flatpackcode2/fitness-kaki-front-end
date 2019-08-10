import React, { Component } from "react";

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
            names: [],
        };
    }

    toDataUrl = (url, callback) => {
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

    predictImage = (e) => {
        let image = '';
        this.toDataUrl(e.target.value, (myBase64) => {
            image = myBase64 // myBase64 is the base64 string
        });

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


    render() {

        // if (this.state.image)
        //     return (
        //         <div>this.predictImage</div>
        //     )
        // else
        return (
            < div className="wrapper" >
                <form  >
                    <div className="form-group" >
                        <input onChange={e => this.predictImage(e)} name="image" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="" placeholder="Select URL" />
                    </div>
                </form>
                {
                    this.state.names.slice(0, 5).map((name, key) =>
                        <h1>{name.name}</h1>

                    )
                }
            </div >
        );
    }
}

export default Upload;