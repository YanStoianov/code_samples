// core
import Vue                from "vue";
import Vuex               from "vuex";
import summary           from "./modules/summary";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    summary
  }
});
export default store;
