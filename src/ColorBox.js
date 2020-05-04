import React, {Component} from 'react';
import './ColorBox.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom';
import chroma from 'chroma-js';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  colorBox: {
    width: '20%',
    height: props => (props.showingFullPalette ? '25%' : '50%'),
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    '&:hover $copyButton': {
      opacity: '1',
      transition: 'all 0.3s ease-in',
    },
  },
  copyText: {
    color: props =>
      chroma (props.background).luminance () >= 0.50
        ? 'rgba(0,0,0,0.55)'
        : 'white',
  },
  colorName: {
    color: props =>
      chroma (props.background).luminance () <= 0.08
        ? 'white'
        : 'rgba(0,0,0,0.55)',
  },
  seeMore: {
    color: props =>
      chroma (props.background).luminance () >= 0.50
        ? 'rgba(0,0,0,0.55)'
        : 'white',
    background: 'rgba(255,255,255,0.3)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase',
  },

  copyButton: {
    color: props =>
      chroma (props.background).luminance () >= 0.50
        ? 'rgba(0,0,0,0.55)'
        : 'white',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255,255,255,0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    opacity: '0',
  },
};

export class ColorBox extends Component {
  constructor (props) {
    super (props);
    this.state = {
      copied: false,
    };
    this.changeCopyState = this.changeCopyState.bind (this);
  }

  changeCopyState () {
    this.setState (
      {
        copied: true,
      },
      () => {
        setTimeout (() => this.setState ({copied: false}), 1500);
      }
    );
  }

  render () {
    const {
      name,
      background,
      id,
      paletteId,
      showingFullPalette,
      classes,
    } = this.props;
    const {copied} = this.state;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{background}} className={classes.colorBox}>
          <div
            style={{background}}
            className={`copy-overlay ${copied && 'show'} `}
          />
          <div className={`copy-msg ${copied && 'show'}`}>
            <h1>copied!</h1>
            <p className={classes.copyText}>
              {background}
            </p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>
              COPY
            </button>
          </div>
          {showingFullPalette &&
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={e => e.stopPropagation ()}
            >
              {' '}
              <span className={classes.seeMore}>
                MORE
              </span>
              {' '}
            </Link>}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles (styles) (ColorBox);
