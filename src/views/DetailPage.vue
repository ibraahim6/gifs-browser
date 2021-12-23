<template>
  <v-container>
    <v-row>
      <v-col class="cover-div br-10" cols="12" md="12">
        <v-img
          class="ma-0 pa-0"
          v-if="!loadState && singleImg.user"
          width="100%"
          height="190"
          max-width="100%"
          max-height="190"
          :src="singleImg.user.banner_image"
        >
        </v-img>
      </v-col>
    </v-row>
    <v-row class="move-up">
      <v-container class="white-bg br-10">
        <h2 class="" v-if="isValid">{{ singleImg.title }}</h2>
        <h2 class="" v-else>Image Not Correct</h2>
        <v-row align="center" class="spacer" no-gutters>
          <div v-if="singleImg.user" class="d-flex align-center spacer my-2">
            <v-avatar size="36px" class="mr-2">
              <img
                v-if="singleImg.user.avatar_url"
                alt="Avatar"
                :src="singleImg.user.avatar_url"
              />
            </v-avatar>

            <a
              :href="'http://' + singleImg.user.website_url"
              target="_blank"
              rel="noopener noreferrer"
              ><strong class="mr-2">{{ singleImg.username }}</strong></a
            >
            <v-icon :color="singleImg.user.is_verified ? 'blue' : 'grey'" small
              >mdi-checkbox-marked-circle</v-icon
            >
          </div>
          <div v-else>User Not Detected</div>
        </v-row>
      </v-container>
    </v-row>
    <div class="">
      <v-row justify="center" align="center" class="my-2">
        <v-col :cols="isMobile ? 8 : 12" md="7" sm="7" xs="8">
          <v-card
            color="transparent"
            class="container-img my-6"
            :loading="loadState"
            @dblclick="favGif(singleImg, -1)"
          >
            <v-img
              class="white--text align-end img-area"
              :src="`https://media.giphy.com/media/${singleImg.id}/giphy.gif`"
            >
              <template v-slot:placeholder>
                <v-skeleton-loader type="image" min-height="300"></v-skeleton-loader>
              </template>
            </v-img>
            <div>
              <v-icon class="like-area" :id="`likeGif`">mdi-heart</v-icon>
            </div>
          </v-card>
        </v-col>
        <v-col :cols="isMobile ? 4 : 3" md="3" sm="4" xs="4">
          <v-container fluid fill-height class="fill-height d-block">
            <div class="d-block">
              <v-btn :disabled="!isValid" icon small @click="favGif(singleImg, -1)">
                <v-icon :color="singleImg.fav ? 'error' : '#676767'">mdi-heart</v-icon>
              </v-btn>
            </div>
            <div class="d-block">
              <h5>
                Date:
                <span v-if="isValid">{{
                  $moment(singleImg.import_datetime).format("DD MMM YYYY, h:mm A")
                }}</span>
                <span v-else>Not Found</span>
              </h5>
            </div>
            <div class="d-block">
              <h5>
                rating: <span v-if="isValid">{{ singleImg.rating }}</span>
                <span v-else>Not Found</span>
              </h5>
            </div>
            <div class="d-block">
              <h5>
                source:
                <span v-if="isValid"
                  ><a
                    :href="'https://' + singleImg.source"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Link</a
                  ></span
                >
                <span v-else>Not Found</span>
              </h5>
            </div>
          </v-container>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Search",
  components: {},
  data() {
    return {
      loadState: false,
      isValid: true,
    };
  },
  watch: {
    q() {
      this.$store.commit("Gifs/RESET_GIFS");
      this.fetch();
    },
    "$route.query.q"(val) {
      this.q = val;
    },
  },
  created() {
    this.fetch();
  },
  computed: {
    ...mapState({
      favGifsArr: (state) => state.Gifs.favGifsArr,
    }),
    singleImg: {
      get() {
        return this.$store.state.Gifs.singleImg;
      },
      set(newValue) {
        return this.$store.dispatch("Gifs/SET_SINGLE", newValue);
      },
    },
    isMobile() {
      return this.$vuetify.breakpoint.name === "xs";
    },
  },
  mounted() {},
  methods: {
    fetch() {
      this.loadState = true;
      this.$store
        .dispatch("Gifs/getSingleGif", {
          id: this.$route.params.id,
        })
        .then(() => {
          this.isValid = true;
        })
        .catch(() => {
          this.isValid = false;
        })
        .finally(() => {
          this.loadState = false;
        });
    },
    favGif(item, idx) {
      if (this.isValid) {
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
        this.$store.state.Gifs.singleImg.fav = !this.$store.state.Gifs.singleImg.fav;
      } else {
        alert("This Image Not Correct");
      }
    },
    addAnimate(data) {
      let el = document.getElementById(`likeGif`);
      el.classList.add("add-animate");
      setTimeout(() => {
        el.classList.remove("add-animate");
      }, 500);
      this.$store.dispatch("Gifs/addFav", data.item.id);
      this.$store.dispatch("Gifs/setFavs");
    },
    removeAnimate(data) {
      let el = document.getElementById(`likeGif`);
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
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
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
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
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
.cover-div {
  width: 100%;
  height: 200px;
  background: var(--v-primary-base);
}
.move-up {
  position: relative;
  margin-top: -60px !important;
}
.white-bg {
  background: #fff;
  min-height: 10px;
}
.br-10 {
  border-radius: 10px;
}
</style>
