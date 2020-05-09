import React, {Component} from 'react';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

/***Material UI imports ***/
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/***Validator Form Import ***/
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

export class PaletteMetaForm extends Component {
  constructor (props) {
    super (props);

    this.state = {
      open: true,
      newPaletteName: '',
    };
    this.handleChange = this.handleChange.bind (this);
  }

  handleChange (evt) {
    this.setState ({
      [evt.target.name]: evt.target.value,
    });
  }

  componentDidMount () {
    ValidatorForm.addValidationRule ('isPaletteNameUnique', value =>
      this.props.palettes.every (
        ({paletteName}) => paletteName.toLowerCase () !== value.toLowerCase ()
      )
    );
  }

  handleClickOpen = () => {
    this.setState ({open: true});
  };

  render () {
    const {newPaletteName, open} = this.state;
    const {hideForm, handleSubmit} = this.props;
    return (
      <Dialog
        open={open}
        onClose={hideForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Choose a Palette Name <span role="img" aria-label="Palette">🎨</span>
        </DialogTitle>
        <ValidatorForm onSubmit={() => handleSubmit (newPaletteName)}>
          <DialogContent>
            <DialogContentText>
              Enter a name for the new Palette
            </DialogContentText>
            <Picker set="apple" />
            <TextValidator
              label="Palette Name"
              name="newPaletteName"
              value={newPaletteName}
              onChange={this.handleChange}
              fullWidth
              margin="normal"
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={[
                'Enter a Palette Name',
                'Palette Name Already in Use',
              ]}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default PaletteMetaForm;
