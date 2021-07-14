import { Component } from 'react';
import { Link } from 'react-router-dom';
import Authentication from './Authentication.js';
import { withRouter } from 'react-router';

class HeaderComponent extends Component {
    render() {
      const isUserLoggedin = Authentication.isUserLoggedin();
      return (
        <header>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-brand">Praveen</div>
            <ul className="navbar-nav">
              {isUserLoggedin && <li className="nav-link"><Link to="/Welcome/:name">Home</Link></li>}
              {isUserLoggedin && <li className="nav-link"><Link to="/ListTodo">Todoss</Link></li>}
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
              {!isUserLoggedin && <li className="nav-link"><Link to="/login">Login</Link></li>}
              {isUserLoggedin && <li className="nav-link"><Link to="/logout" onClick={Authentication.logout}>Logout</Link></li>}
            </ul>
          </nav>
        </header>
      );
    }
  }

  export default withRouter(HeaderComponent);