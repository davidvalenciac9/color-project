import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import {generatePalette} from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';

class App extends Component {
  findPalette (id) {
    return seedColors.find (palette => {
      return palette.id === id;
    });
  }
  render () {
    return (
      <Switch>
        <Route exact path="/palette/new/" render={() => <NewPaletteForm />} />
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList {...routeProps} palettes={seedColors} />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette (
                this.findPalette (routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette (
                this.findPalette (routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    );
    //<div className="App">
    //  <Palette palette={generatePalette (seedColors[7])} />
    //</div>
  }
}

export default App;
