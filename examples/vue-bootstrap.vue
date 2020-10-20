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
          :required="i.required"
          v-model="formData[i.title]"
          :name="i.entry"
        ></b-form-input>

        <b-form-radio-group
          v-else-if="i.type === 'multiple-choice'"
          :options="i.choices"
          v-model="formData[i.title]"
          :required="i.required"
          :name="i.entry"
        >
        </b-form-radio-group>

        <b-form-checkbox-group
          v-else-if="i.type === 'checkbox'"
          :options="i.choices"
          v-model="formData[i.title]"
          :required="i.required"
          :name="i.entry"
        >
        </b-form-checkbox-group>

        <b-form-select
          v-else-if="i.type === 'dropdown'"
          :options="i.choices"
          text="--Select--"
          v-model="formData[i.title]"
          :required="i.required"
          :name="i.entry"
        >
        </b-form-select>

        <!-- 
          linear-scale is essentially a group of radio buttons..

          handle other type of inputs below... 
        -->
      </b-form-group>

      <b-button type="submit" variant="danger" block> Submit </b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import { get } from "custom-gform";

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
      this.gFormData = await get(
        "https://docs.google.com/forms/d/e/1FAIpQLSc5LAweF5HoptCrQ0FLEqA5ehUlMog1vki_NXxaXDYPH8q_QA/viewform"
      );

      // Dynamically sets v-model from title
      // Not necessary but useful for form validation
      // Must set if form contains selective inputs (combobox, dropdrop, multiplechoice..)
      // Each form input v-model is declared using its title
      const dynamicVModel = this.gFormData.questions.map(i => i.title);

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
          // Handle success here...
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>