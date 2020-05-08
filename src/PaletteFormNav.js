import React, {Component} from 'react';

/***Material UI Imports ***/
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create (['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create (['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  navBtns: {},
});

export class PaletteFormNav extends Component {
  constructor (props) {
    super (props);

    this.state = {
      newPaletteName: '',
    };
    this.handleChange = this.handleChange.bind (this);
  }

  handleChange (evt) {
    this.setState ({
      [evt.target.name]: evt.target.value,
    });
  }

  render () {
    const {classes, open, palettes, handleSubmit} = this.props;
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
              onClick={this.props.handleDrawerOpen}
              className={classNames (classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <p variant="h6" color="inherit" noWrap>
              Create a Palette
            </p>
          </Toolbar>
          <div className="classes.navBtns">

            <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} />
            <Link to="/">
              <Button variant="contained" color="secondary">Go Back</Button>
            </Link>
          </div>
        </AppBar>

      </div>
    );
  }
}

export default withStyles (styles, {withTheme: true}) (PaletteFormNav);
