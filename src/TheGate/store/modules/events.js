import axios from "axios";

const SET_EVENTS = "SET_EVENTS";

const state = {
  events: [],
};

const getters = {
  events: (state) => state.events,
};

const actions = {
  async fetchEvents({ commit }) {
    const { data } = await axios.get("/api/v2/public/events");
    commit(SET_EVENTS, data);
  },
};

const mutations = {
  [SET_EVENTS](state, events) {
    state.events = events;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
