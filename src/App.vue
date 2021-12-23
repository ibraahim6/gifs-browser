<template>
  <v-app>
    <app-bar @goSearch="goSearch" />
    <v-main>
      <v-container>
        <div v-if="chips.length > 0 && search">
          <v-chip
            class="mx-2 my-1"
            :color="getRandomColor(idx)"
            v-for="(chip, idx) in chips"
            :key="idx"
            @click="goSearch(chip.name)"
            >{{ chip.name }}</v-chip
          >
        </div>
        <div v-if="chips.length == 0 && search">
          No Tags to show
        </div>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import AppBar from "@/components/AppBar";
export default {
  name: "App",
  components: {
    AppBar,
  },
  data() {
    return {
      entries: [],
      isLoading: false,
      model: null,
      // search: null,
      colors: [
        "#4C3F91",
        "#9145B6",
        "#B958A5",
        "#FF5677",
        "#A6CF98",
        "#557C55",
        "#DD4A48",
        "#F0BB62",
        "#4C0070",
        "#396EB0",
      ],
    };
  },
  created() {
    this.getFavs();
  },
  mounted() {
    this.getSearch();
  },
  computed: {
    ...mapState({
      chips: (state) => state.Gifs.Chips,
    }),
    search: {
      get() {
        return this.$store.state.Gifs.search;
      },
      set(newValue) {
        return this.$store.dispatch("Gifs/setSearch", newValue);
      },
    },
  },

  watch: {
    search(val) {
      this.searchChips(val);
    },
  },
  methods: {
    getSearch() {
      this.$store.dispatch("Gifs/setSearch", this.$route.query.q);
    },
    searchChips(val) {
      if(val){
        this.isLoading = true;
        this.$store.dispatch("Gifs/searchChips", val).finally(() => {
          this.isLoading = false;
        });
      }
    },
    goSearch(val) {
      this.$router.push(`/search?q=${val}`);
    },
    getRandomColor(idx) {
      return this.colors[idx];
    },
    getFavs() {
      this.$store.dispatch("Gifs/getFavs");
    },
  },
};
</script>
