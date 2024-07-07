import { Component } from 'react';

class ErrorProneComponent extends Component {
  render() {
    throw new Error('Simulate Error');
    return <div>Should not render</div>;
  }
}

export default ErrorProneComponent;
