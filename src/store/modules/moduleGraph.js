export const moduleGraph = {
  state: {
    totalValue: null,
    averageValue: null,
    totalItemsWithCertainValueCondition: null,
  },

  // - [ ] The total value of all items in the table.
  // - [ ] The average value of all items in the table.
  // - [ ] The number of items in the table with a value greater than or equal to 50.

  mutations: {
    SET_TOTAL_VALUE(state, totalItems) {
      state.totalItems = totalItems;
    },
  },

  actions: {
    setTotalValue({ rootState, commit }) {
      try {
        const fetchedData = rootState.moduleData.data;
        console.log(fetchedData);
        // commit("SET_TOTAL_ITEMS", );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
