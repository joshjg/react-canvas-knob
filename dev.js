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
      <div>
        <Knob
          value={this.state.value}
          onChange={this.handleChange}
          step={10}
          min={0}
          max={500}
          angleArc={180}
          angleOffset={-90}
          height={100}
          width={200}
          onChangeEnd={(v) => console.log(v)}
        />
        <Knob
          value={this.state.value}
          onChange={this.handleChange}
          step={10}
          min={0}
          max={500}
          angleArc={180}
          height={200}
          width={100}
        />
        <Knob
          value={this.state.value}
          onChange={this.handleChange}
          step={10}
          min={0}
          max={500}
        />
        <Knob
          value={this.state.value}
          onChange={this.handleChange}
          step={10}
          min={0}
          max={500}
        />
        <Knob
          value={this.state.value}
          onChange={this.handleChange}
          step={10}
          min={0}
          max={500}
        />
        <Knob
          value={this.state.value}
          onChange={this.handleChange}
          step={10}
          min={0}
          max={500}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
