import React, { Component } from 'react';

class User extends Component {
    
    constructor (props) {
        super (props)
        this.state = {
            user: ""
        }
    }

    apiCall(url, handler) {
        fetch(url)
            .then( response => response.json())
            .then( data => handler(data))
            .catch( error => console.log(error))
    }

    componentDidMount(){
        console.log('Mounted!');
        this.apiCall('http://localhost:3000/api/users', this.mostrarUser)   
    }

    mostrarUser = (data) => {
        console.log(data)
        this.setState(
            {
                user: data.count
            }
        )
    }

    render(){
        
        console.log(this.state.user);

        return (
            <div>
                {this.state.user}
            </div>
        )
    }
}

export default User;