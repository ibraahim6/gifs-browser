<template>
  <v-container>
    <h3>Trending Now</h3>
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
import ImageContainer from "@/components/ImageContainer";
import IntersectionObserver from "@/components/infiniteScroll";
import LoadState from "@/components/LoadState";
export default {
  name: "Home",
  components: {
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
    this.fetch();
  },

  mounted() {},
  computed: {
    ...mapState({
      imgs: (state) => state.Gifs.Imgs,
      favGifsArr: (state) => state.Gifs.favGifsArr,
      limit: (state) => state.Gifs.limit,
      offset: (state) => state.Gifs.offset,
      total: (state) => state.Gifs.total,
    }),
  },

  methods: {
    fetch() {
      this.loadState = true;
      setTimeout(() => {
        this.$store
          .dispatch("Gifs/getGifsTrending", {
            limit: this.limit,
            offset: this.offset,
          })
          .finally(() => {
            this.loadState = false;
          });
      }, 1500);
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
<style scoped>
.container-img {
  position: relative;
}

.z-idx-5 {
  z-index: 5 !important;
}

.head-area {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0)
  );
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  content: "";
  transition: all 0.3s ease;
  z-index: 1;
  opacity: 0;
  height: 40px;
  color: #fff;
}
.bottom-area {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0)
  );
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  content: "";
  transition: all 0.3s ease;
  z-index: 1;
  opacity: 0;
  height: 50px;
  color: #fff;
}
.bottom-area a {
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bottom-area:hover a {
  text-decoration: underline;
}
.container-img:hover .head-area,
.container-img:hover .bottom-area {
  opacity: 1;
}

.like-area {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent !important;
  cursor: pointer;
  transition: all 0.5s;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  z-index: 2;
  -webkit-text-stroke: 2px #e5e5e5;
  color: whitesmoke;
  transition: all ease-in-out;
}

.img-area {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: 0.2s ease;
  backface-visibility: hidden;
}

.add-animate {
  color: red;
  -webkit-text-stroke: 1px red;
  animation: 1.5s infinite add-burst;
}
.remove-animate {
  color: #fff;
  -webkit-text-stroke: 1px #fff;
  animation: 1.5s infinite remove-burst;
}

@keyframes add-burst {
  0%,
  10% {
    transform: scale(3);
    opacity: 0.8;
    color: red;
  }
  45% {
    transform: scale(0.2) rotate(30deg);
    opacity: 0.9;
  }
  50% {
    transform: scale(4) rotate(-37.5deg);
    opacity: 1;
    color: red;
    text-shadow: 2px 2px 6px rgba(235, 9, 9, 0.5);
  }
  90%,
  95% {
    transform: scale(1) rotate(10deg);
    text-shadow: none;
  }
  100% {
    transform: rotate(-2.5deg);
  }
}
@keyframes remove-burst {
  0%,
  10% {
    transform: scale(3);
    opacity: 0.8;
    color: lavender;
  }
  45% {
    transform: scale(0.2) rotate(30deg);
    opacity: 0.9;
  }
  50% {
    transform: scale(4) rotate(-37.5deg);
    opacity: 1;
    color: #fff;
    text-shadow: 2px 2px 6px #fff(235, 9, 9, 0.5);
  }
  90%,
  95% {
    transform: scale(1) rotate(10deg);
    text-shadow: none;
  }
  100% {
    transform: rotate(-2.5deg);
  }
}
</style>
