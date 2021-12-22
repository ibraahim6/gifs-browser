<template>
  <v-container>
    <masonry
      v-if="imgs.length"
      :gutter="{ default: '30px', 700: '15px' }"
      :cols="{ default: 4, 1000: 4, 700: 3, 500: 2 }"
    >
      <v-card
        color="transparent"
        class="container-img my-6"
        v-for="(item, idx) in imgs"
        :key="idx"
        @click.prevent="handleClick(item, idx)"
      >
        <div class="head-area z-idx-5">
          <v-container class="d-flex justify-end align-center">
            <v-btn icon small @click="favGif(item, idx)">
              <v-icon :color="item.fav ? 'error' : '#fff'">mdi-heart</v-icon>
            </v-btn>
          </v-container>
        </div>
        <v-img
          class="white--text align-end img-area"
          :src="`https://media.giphy.com/media/${item.id}/giphy.gif`"
        >
          <template v-slot:placeholder>
            <v-skeleton-loader
              type="image"
              min-height="300"
            ></v-skeleton-loader>
          </template>
        </v-img>
        <div class="bottom-area z-idx-5">
          <v-container class="d-flex justify-start align-center">
            <router-link
              @click="goSearch(item.title)"
              :to="`/search?q=${item.title}`"
              class="mr-2 white--text"
              ># {{ item.title }}</router-link
            >
          </v-container>
        </div>
        <div>
          <v-icon class="like-area" :id="`likeGif${idx}`">mdi-heart</v-icon>
        </div>
      </v-card>
    </masonry>
    <div v-else>
      <span class="display-1 error--text" v-if="!load">No Gifs to show</span>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "ImageContainer",
  props: {
    imgs: {
      type: Array,
      default: () => {
        return [];
      },
    },
    load: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clicks: 0,
      timer:0
    };
  },
  watch: {},
  created() {},
  mounted() {},
  components: {},
  methods: {
    handleClick(item, idx) {
      this.clicks++;
      if (this.clicks === 1) {
        this.timer = setTimeout(() => {
          this.goDetail(item.id);
          this.clicks = 0;
        }, 300);
      } else {
        clearTimeout(this.timer);
        this.favGif(item, idx);
        this.clicks = 0;
      }
    },
    goDetail(data) {
      this.$router.push(`/detail/${data}`);
    },
    goSearch(data) {
      this.$router.push(`/search?q=${data}`);
    },
    favGif(item, idx) {
      this.$emit("favGif", item, idx);
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
