import { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Authentication from './Authentication.js';

class AuthenticatedRoute extends Component{
    render(){
        if(Authentication.isUserLoggedin()){
            return <Route {...this.props}/>
        }else{
            return <Redirect to = "./Login" />
        }
    }
}

export default AuthenticatedRoute