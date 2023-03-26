import { createStore } from "vuex";

export const store = createStore({
  state: {
    data: null,
    dataError: null,
    itemDetails: null,
    itemDetailsError: null,
  },

  mutations: {
    SET_DATA(state, data) {
      state.data = data;
      state.dataError = null;
    },
    SET_DATA_ERROR(state, error) {
      state.data = null;
      state.dataError = error;
    },

    SET_ITEM_DETAILS(state, itemDetails) {
      state.itemDetails = itemDetails;
      state.itemDetailsError = null;
    },
    SET_ITEM_DETAILS_ERROR(state, error) {
      state.itemDetails = null;
      state.itemDetailsError = error;
    },
  },

  actions: {
    async fetchData({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/data");
        const data = await response.json();
        commit("SET_DATA", data);
      } catch (error) {
        console.error(error);
        commit(
          "SET_DATA_ERROR",
          "Error fetching data. Please try again later."
        );
      }
    },

    async fetchItemDetails({ commit }, itemId) {
      try {
        const response = await fetch(
          `http://localhost:3002/extendedData/${itemId}`
        );
        const itemDetails = response.json();
        commit("SET_ITEM_DETAILS", itemDetails);
      } catch (error) {
        console.error(error);
        commit(
          "SET_ITEM_DETAILS_ERROR",
          "Error fetching data. Please try again later."
        );
      }
    },
  },

  getters: {
    getData(state) {
      return state.data;
    },
    getDataError(state) {
      return state.dataError;
    },
  },
});
