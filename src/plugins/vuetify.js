import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 670,
      sm: 800,
      md: 1080,
      lg: 1300,
    },
  },
  theme: {
    options: { customProperties: true },
  },
});
