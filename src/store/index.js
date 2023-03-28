import { createStore } from "vuex";
import { moduleData } from "./modules/moduleData";
import { moduleGraph } from "./modules/moduleGraph";

export const store = createStore({
  modules: {
    moduleData: moduleData,
    moduleGraph: moduleGraph,
  },
});
