import React, {Component} from 'react';

/***Validator Form Import ***/
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

/***Material UI Imports ***/
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

export class PaletteFormNav extends Component {
  constructor (props) {
    super (props);

    this.state = {
      newPaletteName: '',
    };
    this.handleChange = this.handleChange.bind (this);
  }

  componentDidMount () {
    ValidatorForm.addValidationRule ('isPaletteNameUnique', value =>
      this.props.palettes.every (
        ({paletteName}) => paletteName.toLowerCase () !== value.toLowerCase ()
      )
    );
  }

  handleChange (evt) {
    this.setState ({
      [evt.target.name]: evt.target.value,
    });
  }

  render () {
    const {classes, open} = this.props;
    const {newPaletteName} = this.state;
    return (
      <div>
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
              onClick={this.props.handleDrawerOpen}
              className={classNames (classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <p variant="h6" color="inherit" noWrap>
              Persistent drawer
            </p>
            <ValidatorForm
              onSubmit={() => this.props.handleSubmit (newPaletteName)}
            >
              <TextValidator
                label="Palette Name"
                name="newPaletteName"
                value={this.state.newPaletteName}
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={[
                  'Enter a Palette Name',
                  'Palette Name Already in Use',
                ]}
              />
              <Link to="/">
                <Button variant="contained" color="secondary">Go Back</Button>
              </Link>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>

      </div>
    );
  }
}

export default PaletteFormNav;
