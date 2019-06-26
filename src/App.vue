<template>
  <div class="cv">
    <change-data :data="data" :updateData="updateData"></change-data>
    <header>
      <div class="content">
        <cv-header :data="data" />
      </div>
      <about :data="data" />
    </header>
    <div class="conteudo">
      <div class="content">
        <div
          v-if="!!data.description"
          class="bio-wrapper">
          <h2>Sobre</h2>
          <div class="sobre">
            <span v-html="data.description" />
          </div>
          <div class="bio" v-if="!!data.languages.length">
            <strong>Idiomas:</strong><br>
            {{ data.languages.join(', ') }}
          </div>
        </div>

        <div
          v-for="(content, key) in data.additionalContent"
          :key="`additional-${key}`"
          class="has-hr"
        >
          <h2>{{ content.title }}</h2>
          <template
            v-for="(subContent, subContentIndex) in content.content"
          >
            <ul
              class="ul-history"
              v-if="subContent.type === 'history'"
              :key="`history-${subContentIndex}`"
            >
              <li
                v-for="(history, index) in subContent.data"
                :key="`history-${index}`"
                class="item">
                <job :data="history" />
              </li>
            </ul>

            <ul
              class="ul-courses avoid-page-break"
              v-if="subContent.type === 'courses'"
              :key="`courses-${subContentIndex}`"
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
              :key="`nodelist-${subContentIndex}`"
            >
              <li
                v-for="(node, key) in subContent.data"
                :key="`node-${key}`"
                class="item">
                <div class="box">{{ node }}</div>
              </li>
            </ul>
          </template>
        </div>

      </div>
    </div>
    <footer class="footer">
      <div class="content">
        Veja mais no meu LinkedIn: <a :href="data.linkedin">{{ data.linkedin }}</a><br/>
        Última atualização em {{ data.lastUpdate }}.
      </div>
    </footer>
  </div>
</template>

<script>
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
  methods: {
    updateData(newData) {
      Vue.set(this, 'data', newData);
    }
  }
}
</script>

<style lang="scss" src="./assets/scss/main.scss" />
