<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-row justify="space-around">
        <div class="d-flex align-center cursor-pointer">
          <a href="/" class="white--text text-decoration-none"
            ><span class="headline">GIFs Browser</span></a
          >
        </div>
        <div v-if="!isMobile" class="d-flex align-center">
          <v-text-field
            v-model="search"
            single-line
            hide-details
            label="Search"
            placeholder="Start typing to Search"
            prepend-icon="mdi-magnify"
            @keyup.enter="goSearch(search)"
          ></v-text-field>
        </div>
        <div v-if="isMobile" class="d-flex align-center">
          <v-btn @click="searchMobile = !searchMobile" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </div>
        <div class="d-flex align-center">
          <v-btn text to="/profile">
            <v-icon>mdi-account</v-icon>
            <span class="ml-2" v-if="!isMobile">Welcome User</span>
          </v-btn>
        </div>
      </v-row>
    </v-app-bar>
    <v-expand-transition v-if="isMobile && searchMobile">
      <v-card color="transparent" outlined class="mt-50" v-if="isMobile && searchMobile">
        <v-card-text>
          <v-col cols="10">
            <v-text-field
              v-model="search"
              single-line
              hide-details
              label="Search"
              placeholder="Start typing to Search"
              prepend-icon="mdi-magnify"
              @keyup.enter="goSearch(search)"
            ></v-text-field>
          </v-col>
        </v-card-text>
      </v-card>
    </v-expand-transition>
  </div>
</template>
<script>
export default {
  name: "AppBar",
  data() {
    return {
      searchMobile: false,
    };
  },
  computed: {
    search: {
      get() {
        return this.$store.state.Gifs.search;
      },
      set(newValue) {
        return this.$store.dispatch("Gifs/setSearch", newValue);
      },
    },
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
  },

  watch: {},
  methods: {
    goHome() {
      this.$router.push(`/`);
    },
    goSearch(val) {
      this.$emit("goSearch", val);
    },
  },
};
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.mt-50 {
  margin-top: 30px !important;
  margin-bottom: -70px !important;
}
</style>
