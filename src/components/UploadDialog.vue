<template>
  <v-dialog v-model="dialogUpload" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Upload Gif</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          @submit.prevent="uploadGif"
          v-model="valid"
          lazy-validation
        >
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-file-input
                accept="image/gif"
                :rules="gifRules"
                prepend-icon="mdi-camera"
                label="Gif"
                v-on:change="onFileSelectedImg"
                v-model="data.gif"
                required
              ></v-file-input>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-card class="mx-auto text-center" max-width="400">
                <v-img :src="urlImg" height="200px"></v-img>
                <v-card-subtitle>Gif</v-card-subtitle>
              </v-card>
            </v-col>
            <v-col class="mb-2" cols="12" sm="12" md="12" v-if="loading_btn">
              <v-progress-linear v-model="progressState" rounded height="20">
                <strong>{{ Math.ceil(progressState) }}%</strong>
              </v-progress-linear>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-row>
            <v-btn color="blue darken-1" text @click="closeDialog">
              Cancel
            </v-btn>
            <v-btn
              :loading="loading_btn"
              :disabled="!valid || loading_btn"
              color="blue darken-1"
              text
              type="submit"
            >
              Upload
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialogUpload: false,
      valid: false,
      urlImg: null,
      loading_btn: false,
      data: {
        gif: [],
      },
      defaultData: {
        gif: [],
      },
      gifRules: [
        (v) => !!v || "Gif is required",
        (v) =>
          (v && v.size <= 5_242_880) || "Gif size should be less than 5 MB!",
      ],
    };
  },
  computed: {
    progressState() {
      return this.$store.state.Gifs.progressState;
    },
  },
  watch: {
    dialog(val) {
      val || this.closeDialog();
    },
  },
  methods: {
    onFileSelectedImg() {
      if (this.data.gif == null) {
        this.urlImg = null;
      } else {
        this.urlImg = URL.createObjectURL(this.data.gif);
      }
    },
    closeDialog() {
      this.dialogUpload = false;
      this.urlImg = null;
      this.$refs.form.resetValidation();
      this.$nextTick(() => {
        this.data = Object.assign({}, this.defaultData);
      });
      this.loading_btn = false;
      this.$store.commit("Gifs/RESET_PROGRESS_DATA");
    },
    uploadGif() {
      if (this.valid) {
        this.loading_btn = true;
        this.$store
          .dispatch("Gifs/uploadGif", this.data)
          .then(() => {
            this.loading_btn = false;
            this.$toast.success(`Uploaded Successfully`, {
              position: "bottom-right",
              timeout: 2000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: true,
              closeButton: "button",
              type: "success",
              icon: true,
            });
            this.$emit("upload");
            this.closeDialog();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
};
</script>
