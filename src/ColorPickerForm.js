import React, {Component} from 'react';
import {ChromePicker} from 'react-color';

/***Validator Form Import ***/
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

/***Material UI Imports ***/
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  picker: {
    width: '100% !important',
    marginTop: '2rem',
  },
  addColor: {
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    fontSize: '2rem',
  },
  colorNameInput: {
    width: '100%',
    height: '70px',
  },
};

export class ColorPickerForm extends Component {
  constructor (props) {
    super (props);

    this.state = {
      currentColor: '#727272',
      newColorName: '',
    };
    this.updateCurrentColor = this.updateCurrentColor.bind (this);
    this.handleChange = this.handleChange.bind (this);
    this.handleSubmit = this.handleSubmit.bind (this);
  }

  componentDidMount () {
    ValidatorForm.addValidationRule ('isColorNameUnique', value =>
      this.props.colors.every (({name}) => {
        return name.toLowerCase () !== value.toLowerCase ();
      })
    );
    ValidatorForm.addValidationRule ('isColorUnique', value =>
      this.props.colors.every (({color}) => color !== this.state.currentColor)
    );
  }

  updateCurrentColor (color) {
    this.setState ({
      currentColor: color.hex,
    });
  }

  handleChange (evt) {
    this.setState ({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit () {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };
    this.props.addNewColor (newColor);
  }

  render () {
    const {currentColor, newColorName} = this.state;
    const {paletteIsFull, classes} = this.props;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            className={classes.colorNameInput}
            value={newColorName}
            name="newColorName"
            variant="filled"
            margin="normal"
            label="Color Name"
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'Enter a Color Name',
              'Color Name already exists',
              'That Color is already in use',
            ]}
          />
          <Button
            style={{
              backgroundColor: !paletteIsFull ? currentColor : 'grey',
            }}
            variant="contained"
            color={paletteIsFull ? 'disabled' : 'primary'}
            type="submit"
            disabled={paletteIsFull}
            className={classes.addColor}
          >
            {paletteIsFull ? 'Palette is Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles (styles) (ColorPickerForm);
