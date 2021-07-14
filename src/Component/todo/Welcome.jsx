import { ErrorMessage } from 'formik';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService';

class Welcome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      welcomeMessage: ''
    }

    this.retrieveWelcomMessage = this.retrieveWelcomMessage.bind(this)
    this.handlesucces = this.handlesucces.bind(this)
    this.handleerror = this.handleerror.bind(this)

  }

  render() {
    return (
      <>
        <div className="Welcome">
          WELCOME {this.props.match.params.name}. Please click <Link to="/ListTodo">here</Link> to see todo table
        </div>
        <div className="Welcome">
          Click to get a customized welcome message.<br />
          <button onClick={this.retrieveWelcomMessage} className="btn btn-success">Get welcome message</button>
        </div>
        <div className="Welcome">
          {this.state.welcomeMessage}
        </div>
      </>
    );
  }

  retrieveWelcomMessage() {
    // HelloWorldService.executeHelloWorldService()
    // .then(response => this.handelsucces(response))

    // HelloWorldService.executeHelloWorldBeanService()
    // .then(response => this.handelsucces(response))

    HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
      .then(response => this.handlesucces(response))
      .catch(error => this.handleerror(error))
  }

  handlesucces(response) {
    this.setState({ welcomeMessage: response.data.message })
  }

  handleerror(error) {

    let errorMassage = '';

    if (error.message) {
      errorMassage += error.message
    }
    if (error.response && error.response.data) {
      errorMassage += error.response.data.message
    }

    this.setState({welcomeMessage: errorMassage})
  }
}

export default Welcome