import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles';
import {Link} from 'react-router-dom';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

class PaletteList extends Component {
  goToPalette (id) {
    this.props.history.push (`/palette/${id}`);
  }

  render () {
    const {palettes, classes, deletePalette} = this.props;
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
                  deletePalette={deletePalette}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>

        </div>

      </div>
    );
  }
}

export default withStyles (styles) (PaletteList);
