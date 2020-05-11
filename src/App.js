import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import {generatePalette} from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

class App extends Component {
  constructor (props) {
    super (props);
    const savedPalettes = JSON.parse (window.localStorage.getItem ('palettes')); //Local Storage Implementation
    this.state = {
      palettes: savedPalettes || seedColors,
    };
    this.savePalette = this.savePalette.bind (this);
    this.findPalette = this.findPalette.bind (this);
    this.deletePalette = this.deletePalette.bind (this);
  }
  findPalette (id) {
    return this.state.palettes.find (palette => {
      return palette.id === id;
    });
  }

  deletePalette (id) {
    this.setState (
      st => ({
        palettes: st.palettes.filter (palette => palette.id !== id),
      }),
      this.syncLocalStorage
    );
  }

  savePalette (newPalette) {
    this.setState (
      {palettes: [...this.state.palettes, newPalette]},
      this.syncLocalStorage
    );
  }

  syncLocalStorage () {
    //save palettes to local storage
    window.localStorage.setItem (
      'palettes',
      JSON.stringify (this.state.palettes)
    );
  }
  render () {
    const {palettes} = this.state;
    return (
      <Route
        render={({location}) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new/"
                  render={routeProps => (
                    <div className="page">
                      <NewPaletteForm
                        {...routeProps}
                        savePalette={this.savePalette}
                        palettes={this.state.palettes}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <div className="page">
                      <PaletteList
                        deletePalette={this.deletePalette}
                        {...routeProps}
                        palettes={palettes}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <div className="page">
                      <Palette
                        palette={generatePalette (
                          this.findPalette (routeProps.match.params.id)
                        )}
                      />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <div className="page">
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette (
                          this.findPalette (routeProps.match.params.paletteId)
                        )}
                      />
                    </div>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
