import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import GifsModule from "./modules/GifModule";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Gifs: GifsModule,
  },
});
