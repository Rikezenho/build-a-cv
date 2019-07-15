<template>
  <div class="cv-builder">
    <change-data :data="data" :updateData="updateData"></change-data>
    <my-cv :data="data" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import cvData from './assets/json/cv.json';
import changeData from './components/changeData';
import cv from './components/cv';
import Vue from 'vue';

export default {
  name: 'CV',
  components: {
    'my-cv': cv,
    'change-data': changeData,
  },
  created() {
    const localStorageData = localStorage.getItem('cv_data');

    if (localStorageData) {
      this.data = JSON.parse(localStorageData);
    } else {
      this.data = cvData;
    }
  },
  data() {
    return {
      data: {},
    };
  },
  computed: mapState([
    'editMode',
  ]),
  methods: {
    updateData(newData) {
      Vue.set(this, 'data', newData);
    }
  }
}
</script>

<style lang="scss" src="./assets/scss/main.scss" />
