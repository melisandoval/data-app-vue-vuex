import { createStore } from "vuex";

export const store = createStore({
  state: {
    data: null,
    dataError: null,
    itemDetails: null,
    itemDetailsError: null,
    currentTablePage: 1,
    selectedItemId: null,
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

    SET_CURRENT_TABLE_PAGE(state, currentPage) {
      state.currentTablePage = currentPage;
    },

    SET_SELECTED_ITEM_ID(state, id) {
      state.selectedItemId = id;
    },
  },

  actions: {
    async fetchData({ commit }) {
      try {
        const response = await fetch("http://localhost:3000/data");

        if (!response || !response.ok) {
          throw new Error();
        }

        const data = await response.json();
        commit("SET_DATA", data);
      } catch (error) {
        console.log(error);
        commit(
          "SET_DATA_ERROR",
          "Sorry, we can't display the data now. Please try again later."
        );
      }
    },

    async fetchItemDetails({ commit }, itemId) {
      try {
        const response = await fetch(
          `http://localhost:3002/extendedData/${itemId}`
        );

        if (!response || !response.ok) {
          throw new Error();
        }

        const itemDetails = await response.json();
        commit("SET_ITEM_DETAILS", itemDetails);
      } catch (error) {
        console.error(error);
        commit(
          "SET_ITEM_DETAILS_ERROR",
          "Sorry, we can't display the data now. Please try again later."
        );
      }
    },

    setCurrentTablePage({ commit }, pageNumber) {
      try {
        commit("SET_CURRENT_TABLE_PAGE", pageNumber);
      } catch (error) {
        console.log(error);
      }
    },

    setSelectedItemId({ commit }, id) {
      try {
        commit("SET_SELECTED_ITEM_ID", id);
      } catch (error) {
        console.log(error);
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

    getItemDetails(state) {
      return state.itemDetails;
    },
    getItemDetailsError(state) {
      return state.itemDetailsError;
    },

    getCurrentTablePage(state) {
      return state.currentTablePage;
    },
    getCurrentSelectedItemId(state) {
      return state.selectedItemId;
    },
  },
});
