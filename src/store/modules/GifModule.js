export default {
  namespaced: true,
  state: {
    Imgs: [],
    favGifsArr: JSON.parse(localStorage.getItem("favGifsArr")) || [],
    limit: 12,
    offset: 0,
    total: 0,
    q: "",
    Chips: [],
    search: "",
    singleImg: "",
  },
  getters: {},
  mutations: {
    GET_FAV_GIFS(state) {
      let arr =  JSON.parse(localStorage.getItem("favGifsArr"));
      arr?state.favGifsArr=arr:localStorage.setItem(`favGifsArr`, JSON.stringify(state.favGifsArr));
      state.favGifsArr = JSON.parse(localStorage.getItem("favGifsArr"));
    },
    SET_FAV_GIFS(state) {
      localStorage.setItem(`favGifsArr`, JSON.stringify(state.favGifsArr));
    },
    ADD_FAV_GIF(state, data) {
      state.favGifsArr.push(data);
    },
    REMOVE_FAV_GIF(state, data) {
      const idx = state.favGifsArr.map((item) => item).indexOf(data);
      state.favGifsArr.splice(idx, 1);
    },
    ADD_FAV_GIF_IMG(state, data) {
      state.Imgs.push(data);
      state.total = state.Imgs.length;
    },
    REMOVE_FAV_GIF_IMG(state, data) {
      const idx = state.Imgs.map((item) => item.id).indexOf(data);
      state.Imgs.splice(idx, 1);
      state.total = state.Imgs.length;
    },
    RESET_GIFS(state) {
      state.Imgs = [];
      state.limit = 12;
      state.offset = 0;
      state.total = 0;
    },
    SET_GIF(state, data) {
      data.data.map((item) => {
        state.Imgs.push({ ...item, fav: false });
      });
      if (state.favGifsArr.length > 0) {
        state.Imgs.forEach((item) => {
          state.favGifsArr.find((ele) => {
            return ele == item.id ? (item.fav = true) : (item.fav = false);
          });
        });
      }
      state.total = data.pagination ? data.pagination.total_count : 0;
      state.offset = state.offset + state.limit;
    },
    RESET_SEARCH(state) {
      state.q = "";
      state.search = "";
    },
    SET_Q(state, data) {
      state.q = data;
    },
    SET_SEARCH(state, data) {
      state.search = data;
    },
    SET_CHIPS(state, data) {
      state.Chips = data;
    },
    SET_SINGLE(state, data) {
      if (state.favGifsArr.length > 0) {
        state.favGifsArr.find((ele) => {
          return ele == data.id ? (data.fav = true) : (data.fav = false);
        });
      }
      state.singleImg = data;
    },
  },

  actions: {
    getGifsTrending(context, { limit, offset }) {
      return new Promise((resolve, reject) => {
        this._vm.$apiClient
          .get(`gifs/trending?limit=${limit}&offset=${offset}`)
          .then((response) => {
            context.commit("SET_GIF", response.data);
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    getGifsSearch(context, { q, limit, offset }) {
      return new Promise((resolve, reject) => {
        this._vm.$apiClient
          .get(`gifs/search?q=${q}&limit=${limit}&offset=${offset}`)
          .then((response) => {
            if (response.status == 200) {
              context.commit("SET_GIF", response.data);
              resolve(response);
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    getGifsFavorite(context, { ids, limit, offset }) {
      return new Promise((resolve, reject) => {
        this._vm.$apiClient
          .get(`gifs?ids=${ids}&limit=${limit}&offset=${offset}`)
          .then((response) => {
            if (response.status == 200) {
              context.commit("SET_GIF", response.data);
              resolve(response);
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    getSingleGif(context, { id }) {
      return new Promise((resolve, reject) => {
        this._vm.$apiClient
          .get(`gifs/${id}`)
          .then((response) => {
            if (response.status == 200) {
              context.commit("SET_SINGLE", response.data.data);
              resolve(response);
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    setSingleGif(context, data) {
      context.commit("SET_SINGLE", data);
    },
    getFavs(context) {
      context.commit("GET_FAV_GIFS");
    },
    setFavs(context) {
      context.commit("SET_FAV_GIFS");
    },
    addFav(context, data) {
      context.commit("ADD_FAV_GIF", data);
    },
    removeFav(context, data) {
      context.commit("REMOVE_FAV_GIF", data);
    },
    addFavImg(context, data) {
      context.commit("ADD_FAV_GIF_IMG", data);
    },
    removeFavImg(context, data) {
      context.commit("REMOVE_FAV_GIF_IMG", data);
    },
    setQ(context, data) {
      context.commit("SET_Q", data);
    },
    setSearch(context, data) {
      context.commit("SET_SEARCH", data);
    },
    searchChips(context, data) {
      return new Promise((resolve, reject) => {
        this._vm.$apiClient
          .get(`gifs/search/tags?q=${data}`)
          .then((response) => {
            if (response.status == 200) {
              context.commit("SET_CHIPS", response.data.data);
              resolve(response);
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
  },
};
