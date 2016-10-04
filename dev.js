import React from 'react';
import ReactDOM from 'react-dom';
import Knob from './Knob';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 10 };
  }
  handleChange = (newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    return (
      <Knob
        value={this.state.value}
        onChange={this.handleChange}
        log
        step={10}
        min={0.001}
        max={100000}
      />
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
