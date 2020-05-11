import React, {Component} from 'react';
import styles from './styles/PaletteFormNavStyles';

/***Material UI Imports ***/
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
/* import ChevronRightIcon from '@material-ui/icons/ChevronRight'; */

export class PaletteFormNav extends Component {
  constructor (props) {
    super (props);

    this.state = {
      newPaletteName: '',
      formShowing: false,
    };
    this.handleChange = this.handleChange.bind (this);
    this.showForm = this.showForm.bind (this);
    this.hideForm = this.hideForm.bind (this);
  }

  handleChange (evt) {
    this.setState ({
      [evt.target.name]: evt.target.value,
    });
  }

  showForm () {
    this.setState ({
      formShowing: true,
    });
  }

  hideForm () {
    this.setState ({
      formShowing: false,
    });
  }

  render () {
    const {
      classes,
      open,
      palettes,
      handleSubmit,
      handleDrawerOpen,
    } = this.props;
    const {formShowing} = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color="default"
          position="fixed"
          className={classNames (classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames (classes.menuButton, open && classes.hide)}
            >
              {/*  <ChevronRightIcon /> */} 🎨
            </IconButton>
            <p variant="h6" color="inherit" noWrap>
              Create a Palette
            </p>
          </Toolbar>
          <div className={classes.navBtns}>

            <Link to="/">
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Go Back
              </Button>
            </Link>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClic
              onClick={this.showForm}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {formShowing &&
          <PaletteMetaForm
            palettes={palettes}
            handleSubmit={handleSubmit}
            hideForm={this.hideForm}
          />}
      </div>
    );
  }
}

export default withStyles (styles, {withTheme: true}) (PaletteFormNav);
