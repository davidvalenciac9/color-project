import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles';
import {Link} from 'react-router-dom';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

/***Material UI Imports ***/
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

class PaletteList extends Component {
  constructor (props) {
    super (props);

    this.state = {
      openDeleteDialog: false,
      deletingId: '',
    };
    this.openDialog = this.openDialog.bind (this);
    this.closeDialog = this.closeDialog.bind (this);
    this.handleDelete = this.handleDelete.bind (this);
  }
  openDialog (id) {
    this.setState ({
      openDeleteDialog: true,
      deletingId: id,
    });
  }

  closeDialog () {
    this.setState ({
      openDeleteDialog: false,
      deletingId: '',
    });
  }

  handleDelete () {
    this.props.deletePalette (this.state.deletingId);
    this.closeDialog ();
  }

  goToPalette (id) {
    this.props.history.push (`/palette/${id}`);
  }

  render () {
    const {palettes, classes, deletePalette} = this.props;
    const {openDeleteDialog, deletingId} = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>React Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>

          <TransitionGroup className={classes.palettes}>
            {palettes.map (palette => (
              <CSSTransition key={palette.id} classNames="fade" timeout={300}>
                <MiniPalette
                  {...palette}
                  handleClick={() => this.goToPalette (palette.id)}
                  /* deletePalette={deletePalette} */
                  openDialog={this.openDialog}
                  key={palette.id}
                  id={palette.id}
                  open
                />
              </CSSTransition>
            ))}
          </TransitionGroup>

        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
        >
          <DialogTitle id="delete-dialog-title">
            Delete This Palette
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: blue[100], color: blue[900]}}>
                  <CheckIcon />
                </Avatar>

              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{backgroundColor: red[100], color: red[900]}}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles (styles) (PaletteList);
