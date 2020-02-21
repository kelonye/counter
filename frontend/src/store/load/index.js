import compose from 'utils/compose';
import LoadData from './data';
import MatchLocationPath from './match-location-path';

class Init {
  async load(getState) {
    this.state = getState();

    // try {
    //   await this.loadUser();
    // } catch (error) {
    //   this.state.app.error = error;
    // }

    this.state.app.isLoaded = true;

    // await this.matchLocationPath();
    await this.loadData();

    return this.state;
  }
}

class Store extends compose([Init, LoadData, MatchLocationPath]) {}

export default new Store();
