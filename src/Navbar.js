import React, {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

export class Navbar extends Component {
  render () {
    const {level, changeLevel} = this.props;
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

      </header>
    );
  }
}

export default Navbar;
