import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';

function MiniPalette (props) {
  const {classes, paletteName, emoji, colors, handleClick} = props;
  const miniColorBoxes = colors.map (color => (
    <div
      className={classes.miniColor}
      style={{backgroundColor: color.color}}
      key={color.name}
    />
  ));
  return (
    <div className={classes.root} onClick={handleClick}>
      <div className={classes.delete}>
        <DeleteForeverSharpIcon
          className={classes.deleteIcon}
          style={{transition: 'all 0.3s ease-in-out'}}
        />
      </div>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles (styles) (MiniPalette);
