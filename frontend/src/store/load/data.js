import { CONTRACT } from 'actions/counter';

export default Base =>
  class extends Base {
    async loadData() {
      try {
        this.state.counter.count = await CONTRACT.read('getCount');
      } catch (e) {
        console.warn(e);
      }
    }
  };
