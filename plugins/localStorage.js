import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    key: "svd-chars",
    paths: ["collections", "current", "selected"]
  })(store);
};
