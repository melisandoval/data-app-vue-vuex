import { createStore } from "vuex";
import { moduleData } from "./modules/moduleData";

export const store = createStore({
  modules: {
    moduleData: moduleData,
  },
});
