import React from 'react';
import {withStyles} from '@material-ui/styles';
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';

const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    '&:hover $deleteIcon': {
      color: 'white',
      transform: 'scale(1.2)',
    },
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    color: 'rgba(0,0,0,0.6)',
    transition: 'all 0.3s ease-in-out',
  },
};

function DraggableColorBox (props) {
  const {classes} = props;
  return (
    <div className={classes.root} style={{backgroundColor: props.color}}>
      <div className={classes.boxContent}>
        <span>{props.name}</span>
        <DeleteForeverSharpIcon className={classes.deleteIcon} />
      </div>
    </div>
  );
}

export default withStyles (styles) (DraggableColorBox);
