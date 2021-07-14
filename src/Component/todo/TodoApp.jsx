import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute'
import Login from './Login';
import ListTodo from './ListTodo'
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import Welcome from './Welcome';
import LogoutComponent from './LogoutComponent';
import ErrorMessage from './ErrorMessage';
import TodoComponent from './TodoComponent';

class TodoApp extends Component {
  render() {
    return (
      <div className="TodoApp">
        <Router>
          <>
            <HeaderComponent />
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login" exact component={Login} />
              <AuthenticatedRoute path="/Welcome/:name" exact component={Welcome} />
              <AuthenticatedRoute path="/ListTodo" exact component={ListTodo} />
              <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
              <AuthenticatedRoute path="/todos/:id" exact component={TodoComponent} />
              <Route component={ErrorMessage} />
            </Switch>
            <FooterComponent />
          </>
        </Router>
      </div>
    );
  }
}

export default TodoApp