import React from 'react';
import ReactDOM from 'react-dom';
import Knob from './Knob';

class Root extends React.Component {
  static responsiveWidths = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  state = {
    value: 10,
    responsiveWidth: Root.responsiveWidths[Math.floor(Math.random() * Root.responsiveWidths.length)],
  };

  handleChange = (newValue) => {
    this.setState({ value: newValue });
  };

  handleUpdateResponsiveWidth = () => {
    this.setState({
      responsiveWidth: Root.responsiveWidths[Math.floor(Math.random() * Root.responsiveWidths.length)],
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Static</h1>
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
            onChangeEnd={(v) => console.log(v)}
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
            onChangeEnd={(v) => console.log(v)}
            step={10}
            min={0}
            max={500}
          />
          <Knob
            value={this.state.value}
            onChange={this.handleChange}
            onChangeEnd={(v) => console.log(v)}
            step={10}
            min={0}
            max={500}
          />
          <Knob
            value={this.state.value}
            onChange={this.handleChange}
            onChangeEnd={(v) => console.log(v)}
            step={10}
            min={0}
            max={500}
          />
          <Knob
            value={this.state.value}
            onChange={this.handleChange}
            onChangeEnd={(v) => console.log(v)}
            step={10}
            min={0}
            max={500}
          />
        </div>
        <div>
          <h2 onClick={this.handleUpdateResponsiveWidth}>Responsive</h2>
          <div style={{ width: this.state.responsiveWidth }}>
            <Knob
              value={this.state.value}
              onChange={this.handleChange}
              onChangeEnd={(v) => console.log(v)}
              step={10}
              min={0}
              max={500}
              width={this.state.responsiveWidth}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
