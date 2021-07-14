import { Component } from 'react';

class FooterComponent extends Component {
    render() {
      return (
        <div>
          <br />
          <footer className="page-footer font-small">
            <div className="footer-copyright text-center py-3 bg-dark text-light">
              © 2020 Copyright:MDBootstrap.com
            </div>
          </footer>
        </div>
      );
    }
  }

export default FooterComponent