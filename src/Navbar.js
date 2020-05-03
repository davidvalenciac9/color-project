import React, {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

/*** MATERIAL UI IMPORTS ***/
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export class Navbar extends Component {
  constructor (props) {
    super (props);

    this.state = {
      format: 'hex',
    };
    this.handleChange = this.handleChange.bind (this);
  }

  handleChange (e) {
    this.setState ({
      format: e.target.value,
    });
    this.props.handleChange (e.target.value);
  }

  render () {
    const {level, changeLevel} = this.props;
    const {format} = this.state;
    return (
      <header className="Navbar">
        <div className="logo">
          <a href="/">ColorPicker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              onAfterChange={changeLevel}
              step={100}
              trackStyle={{backgroundColor: 'transparent'}}
              handleStyle={{
                borderColor: 'green',
                height: 13,
                width: 13,
                marginLeft: -7,
                marginTop: -3,
                backgroundColor: 'green',
                boxShadow: 'none',
              }}
              railStyle={{
                height: 8,
                backgroundColor: 'rgba(0,128,0,0.2)',
              }}
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value="hex">HEX - #FFFFFF</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
      </header>
    );
  }
}

export default Navbar;
