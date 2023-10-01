import React, { Component } from 'react';
import axios from "axios";


class Example extends Component{
    state = {
        text: [],
    }; 

    componentDidMount(){
        axios.get("https://localhost:5001/admin/sample/ingredients")
            .then((response) => {
                this.setState({
                    text: response.data,
                });

            })
            .catch((error) =>{
                console.log(error);
            })
    }

    render() {
        const { text } = this.state;
        return (
            <div>Svar fra api: {text}</div>
        )
    }

}

export default Example; 