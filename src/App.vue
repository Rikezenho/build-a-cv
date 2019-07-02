<template>
  <div class="cv">
    <change-data :data="data" :updateData="updateData"></change-data>
    <div class="main-content">
      <template
        v-for="(content, key) in data.content"
      >
        <template
          v-if="content.type === 'header'"
        >
          <cv-header
            :key="`content-${key}`"
            :data="content.data"
          />    
        </template>
        <template
          v-else-if="content.type === 'contact-block'"
        >
          <about
            :key="`content-${key}`"
            :data="content.data"
          />
        </template>
        <div class="container content" :key="`content-${key}`" v-else>
          <h2 v-if="content.title">{{ content.title }}</h2>
          <div
            v-for="(subContent, subContentIndex) in content.content"
            :class="subContent.avoidPageBreak ? 'avoid-page-break' : ''"
            :key="`subContent-${subContentIndex}`"
          >
            <div
              v-if="subContent.type === 'text-block'"
              v-html="subContent.data"
            >
            </div>

            <div
              v-if="subContent.type === 'small-title-and-text'"
              class="small-title-and-text"
            >
              <strong>{{ subContent.data.title }}:</strong><br/>
              {{ subContent.data.text }}
            </div>

            <ul
              class="ul-history"
              v-if="subContent.type === 'history'"
            >
              <li
                v-for="(history, index) in subContent.data"
                :key="`history-${index}`"
                class="item">
                <job :data="history" />
              </li>
            </ul>

            <ul
              class="ul-courses"
              v-if="subContent.type === 'courses'"
            >
              <li
                v-for="(course, index) in subContent.data"
                :key="`course-${index}`"
                class="item">
                <course :data="course" />
              </li>
            </ul>

            <ul
              class="ul-nodelists"
              v-if="subContent.type === 'nodelist'"
            >
              <li
                v-for="(node, key) in subContent.data"
                :key="`node-${key}`"
                class="item">
                <div class="box">{{ node }}</div>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>
    <footer class="footer" v-if="data.footer.linkedin || data.footer.lastUpdate">
      <div class="container">
        <template v-if="data.footer.linkedin">Veja mais no meu LinkedIn: <a :href="data.footer.linkedin">{{ data.footer.linkedin }}</a><br/></template>
        <template v-if="data.footer.lastUpdate">Última atualização em {{ data.footer.lastUpdate }}.</template>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import cvHeader from './components/cv/header'
import changeData from './components/changeData'
import about from './components/cv/about'
import course from './components/cv/course'
import job from './components/cv/job'
import cvData from './assets/json/cv.json'
import Vue from 'vue';

export default {
  name: 'CV',
  components: {
    'cv-header': cvHeader,
    'change-data': changeData,
    about,
    course,
    job
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
