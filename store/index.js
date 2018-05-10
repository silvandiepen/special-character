import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      current: {
        selected: null,
        collectionName: null
      },
      selected: [],
      collections: []
    }
  });
};

export default createStore;
