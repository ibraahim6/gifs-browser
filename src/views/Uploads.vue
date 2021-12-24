<template>
  <v-container>
    <v-row>
      <div class="d-flex">
        <h2 class="d-flex">Your Uploads Gifs</h2>
        <span class="ml-2 overline d-flex align-end">{{ total }} GIFs</span>
      </div>
      <v-spacer />
      <v-btn color="blue" @click="openDialog">Upload New</v-btn>
      <upload-dialog ref="uploadDialog" @upload="uploadGif" />
    </v-row>
    <image-container :load="loadState" :imgs="imgs" @favGif="favGif" />
    <load-state :load="loadState" />
    <intersection-observer
      v-if="imgs.length && offset >= 0"
      @loadMore="fetch"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import UploadDialog from "@/components/UploadDialog";
import ImageContainer from "@/components/ImageContainer";
import IntersectionObserver from "@/components/infiniteScroll";
import LoadState from "@/components/LoadState";
export default {
  name: "Home",
  components: {
    UploadDialog,
    ImageContainer,
    IntersectionObserver,
    LoadState,
  },
  data() {
    return {
      loadState: false,
    };
  },
  created() {
    this.$store.commit("Gifs/RESET_GIFS");
    this.$store.commit("Gifs/RESET_SEARCH");
    this.$store.dispatch("Gifs/setUploads");
    this.fetch();
  },

  mounted() {},
  computed: {
    ...mapState({
      imgs: (state) => state.Gifs.Imgs,
      favGifsArr: (state) => state.Gifs.favGifsArr,
      uploadGifsArr: (state) => state.Gifs.uploadGifsArr,
      limit: (state) => state.Gifs.limit,
      offset: (state) => state.Gifs.offset,
      total: (state) => state.Gifs.total,
    }),
  },

  methods: {
    fetch() {
      if (this.total >= this.offset) {
        this.loadState = true;
        this.$store
          .dispatch("Gifs/getGifsIDS", {
            ids: this.uploadGifsArr,
            limit: this.limit,
            offset: this.offset,
          })
          .finally(() => {
            this.loadState = false;
          });
      }
    },
    openDialog() {
      this.$refs.uploadDialog.dialogUpload = true;
    },
    uploadGif() {
      this.$store.commit("Gifs/RESET_GIFS");
      this.fetch();
      this.$refs.uploadDialog.closeDialog();
    },
    goSearch(data) {
      this.router.push(`/search?q=${data}`);
    },
    favGif(item, idx) {
      if (this.favGifsArr.length > 0) {
        if (
          this.favGifsArr.find((ele) => {
            return ele == item.id;
          })
        ) {
          this.removeAnimate({ item, idx });
        } else {
          this.addAnimate({ item, idx });
        }
      } else {
        this.addAnimate({ item, idx });
      }
      item.fav = !item.fav;
    },
    addAnimate(data) {
      let el = document.getElementById(`likeGif${data.idx}`);
      el.classList.add("add-animate");
      setTimeout(() => {
        el.classList.remove("add-animate");
      }, 500);
      this.$store.dispatch("Gifs/addFav", data.item.id);
      this.$store.dispatch("Gifs/setFavs");
    },
    removeAnimate(data) {
      let el = document.getElementById(`likeGif${data.idx}`);
      el.classList.add("remove-animate");
      setTimeout(() => {
        el.classList.remove("remove-animate");
      }, 500);
      this.$store.dispatch("Gifs/removeFav", data.item.id);
      this.$store.dispatch("Gifs/setFavs");
    },
  },
};
</script>
<style scoped></style>
