import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      current: {
        selected: null,
        collectionName: null
      },
      selected: [],
      collections: [
        {
          title: "arrows",
          items: [
            "2195",
            "209a",
            "2196",
            "2190",
            "2191",
            "2192",
            "2193",
            "2194",
            "2197",
            "2198",
            "2199",
            "219a",
            "219b",
            "219c",
            "219d",
            "219e",
            "219f"
          ]
        },
        {
          title: "emoticons",
          items: ["2600", "2601", "2602", "2603", "2604"]
        },
        {
          title: "armenian",
          items: ["1200", "1201", "1202", "1203", "1204"]
        }
      ]
    }
  });
};

export default createStore;
