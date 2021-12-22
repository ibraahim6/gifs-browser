<template>
  <v-app-bar app color="primary" dark>
    <v-row justify="space-around">
      <div class="d-flex align-center cursor-pointer">
        <a href="/" class="white--text text-decoration-none"><span class="headline">GIFs Browser</span></a>
      </div>
      <div class="d-flex align-center">
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
      <div class="d-flex align-center">
        <v-btn text to="/profile">
          <v-icon>mdi-account</v-icon>
          <span class="ml-2">Welcome User</span>
        </v-btn>
      </div>
    </v-row>
  </v-app-bar>
</template>
<script>
export default {
  name: "AppBar",
  data() {
    return {};
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
.cursor-pointer {cursor: pointer;}
</style>
