<template>
  <div>
    <b-form
      v-if="gFormData"
      @submit.prevent="submitForm"
      v-on:submit.prevent
      class="mx-5"
      ref="formElement"
    >
      <div class="text-center m-2 mb-3">
        <h3 class="my-5">{{ gFormData.formTitle }}</h3>
        <p>{{ gFormData.formDescription }}</p>
      </div>

      <b-form-group
        v-for="(i, index) in gFormData.questions"
        :key="index"
        :label="i.title"
        :description="i.description"
        class="mb-3"
      >
        <b-form-input
          v-if="i.type === 'short-answer'"
          required
          v-model="formData[i.title]"
          :name="i.entry"
        ></b-form-input>

        <!-- 
            handle other type of inputs below... 
        -->
      </b-form-group>

      <b-button type="submit" variant="danger" block> Submit </b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import gform from "custom-google-form";

export default {
  data() {
    return {
      gFormData: {},
      formData: {},
    };
  },
  mounted() {
    this.getForm();
  },
  methods: {
    async getForm() {
      this.gFormData = await gform.get(
        "https://docs.google.com/forms/d/1arkMnCT_O8c1KO6-vcrMRGikzVZsOzwJCL82ZM8RJOw/edit"
      );

      // Dynamically sets v-model from title
      // Not necessary but useful for form validation
      // Each form input v-model is declared using its title
      const dynamicVModel = this.gFormData.questions.map((i) => i.title);

      dynamicVModel.forEach((i) => {
        this.$set(this.formData, i, null);
      });
    },
    async submitForm() {
      const ax = axios.create();
      const formElement = this.$refs.formElement;
      const formData = new FormData(formElement);

      await ax
        .post(this.gFormData.formAction, formData)
        .then((rsp) => {
          // Do something here...
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>