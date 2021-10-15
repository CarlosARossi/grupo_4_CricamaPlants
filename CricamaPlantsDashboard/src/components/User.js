import React, { Component } from 'react';

class User extends Component {
    constructor (props) {
        super (props)
        this.state = {
            user: ""
        }
    }

    apiCall(url, consecuencia) {
        fetch(url)
            .then( response => response.json())
            .then( data => consecuencia(data))
            .catch( error => console.log(error))
    }


    componentDidMount(){
        this.apiCall('http://localhost:3000/api/users/1', this.mostrarUser)   
    }

    mostrarUser = (data) => {
        console.log(data)
        this.setState(
            {
                user: data.data.email
            }
        )
    }

    render(){
        
        return (
            <div>
                {this.state.user}
            </div>
        )
    }
}

export default User;