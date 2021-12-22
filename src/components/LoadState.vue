<template>
  <v-row class="my-4" v-if="load" justify="center">
    <v-col cols="12" md="4">
      <v-progress-linear
        color="blue"
        height="10"
        indeterminate
        rounded
        striped
      ></v-progress-linear>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "LoadState",
  props: {
    load: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  components: {},
  methods: {},
};
</script>
