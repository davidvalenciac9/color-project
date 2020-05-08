import React, {Component} from 'react';
import {ChromePicker} from 'react-color';
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav';

/***Validator Form Import ***/
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

/***Material UI Imports ***/
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
    const {paletteIsFull} = this.props;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            value={newColorName}
            name="newColorName"
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
          >
            {paletteIsFull ? 'Palette is Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default ColorPickerForm;
