import React, {Component} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles/NavbarStyles';

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
    const {level, changeLevel, showingAllColors, classes} = this.props;
    const {format, open} = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">ColorPicker</Link>
        </div>
        {showingAllColors &&
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
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
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #FFFFFF</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          open={open}
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

export default withStyles (styles) (Navbar);
