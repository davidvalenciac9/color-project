import React, {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

/*** MATERIAL UI IMPORTS ***/
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';

export class Navbar extends Component {
  constructor (props) {
    super (props);

    this.state = {
      format: 'hex',
      open: false,
    };
    this.handleFormatChange = this.handleFormatChange.bind (this);
    this.closeSnackBar = this.closeSnackBar.bind (this);
  }

  handleFormatChange (e) {
    this.setState ({
      format: e.target.value,
      open: true,
    });
    this.props.handleChange (e.target.value);
  }

  closeSnackBar () {
    this.setState ({
      open: false,
    });
  }

  render () {
    const {level, changeLevel, showingAllColors} = this.props;
    const {format} = this.state;
    return (
      <header className="Navbar">
        <div className="logo">
          <Link to="/">ColorPicker</Link>
        </div>
        {showingAllColors &&
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
          </div>}
        <div className="select-container">
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #FFFFFF</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          open={this.state.open}
          autoHideDuration={2000}
          message={<span id="message-id">Format Changed to {format}!</span>}
          ContentProps={{
            'aria-describredby': 'message-id',
          }}
          onClose={this.closeSnackBar}
          action={[
            <IconButton
              onClick={this.closeSnackBar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    );
  }
}

export default Navbar;
