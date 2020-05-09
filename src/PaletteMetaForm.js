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
      stage: 'form',
      newPaletteName: '',
    };
    this.handleChange = this.handleChange.bind (this);
    this.showEmojiPicker = this.showEmojiPicker.bind (this);
    this.savePalette = this.savePalette.bind (this);
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

  showEmojiPicker () {
    this.setState ({
      stage: 'emoji',
    });
  }

  savePalette (emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    };
    this.props.handleSubmit (newPalette);
  }

  render () {
    const {newPaletteName} = this.state;
    const {hideForm} = this.props;
    return (
      <div>
        <Dialog open={this.state.stage === 'emoji'}>
          <DialogTitle id="form-dialog-title">
            Choose a Palette Emoji
          </DialogTitle>
          <Picker
            emoji=""
            title="Pick a Palette Emoji"
            set="apple"
            onSelect={this.savePalette}
          />
        </Dialog>
        <Dialog
          open={this.state.stage === 'form'}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a Palette Name
            {' '}
            <span role="img" aria-label="Palette">🎨</span>
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Enter a name for the new Palette
              </DialogContentText>

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
      </div>
    );
  }
}

export default PaletteMetaForm;
