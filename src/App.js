import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import {generatePalette} from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';

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
            <CSSTransition key={location.key} classNames="page" timeout={300}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new/"
                  render={routeProps => (
                    <Page>
                      <NewPaletteForm
                        {...routeProps}
                        savePalette={this.savePalette}
                        palettes={this.state.palettes}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        deletePalette={this.deletePalette}
                        {...routeProps}
                        palettes={palettes}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <Page>
                      <Palette
                        palette={generatePalette (
                          this.findPalette (routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette (
                          this.findPalette (routeProps.match.params.paletteId)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        deletePalette={this.deletePalette}
                        {...routeProps}
                        palettes={palettes}
                      />
                    </Page>
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
