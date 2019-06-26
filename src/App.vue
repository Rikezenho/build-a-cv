<template>
  <div class="cv">
    <header>
      <div class="content">
        <cv-header :data="data" />
      </div>
      <about :data="data" />
    </header>
    <div class="conteudo">
      <div class="content">
        <div
          v-if="!!data.description && (!!data.languages.length)"
          class="bio-wrapper">
          <h2>Sobre</h2>
          <div class="sobre">
            <span v-html="data.description" />
          </div>
          <div class="bio">
            <div
              v-if="!!data.languages.length"
              class="item">
              <strong>Idiomas:</strong><br>
              {{ data.languages.join(', ') }}
            </div>
          </div>
        </div>

        <div
          v-if="!!data.history.length"
          class="history-wrapper has-hr">
          <h2>Experiência profissional</h2>
          <ul class="ul-history">
            <li
              v-for="(history, index) in data.history"
              :key="`history-${index}`"
              class="item">
              <job :data="history" />
            </li>
          </ul>
        </div>

        <div
          v-if="!!data.complementary.length"
          class="complementary-wrapper has-hr avoid-page-break">
          <h2>Cursos complementares</h2>
          <ul class="ul-complementary-courses">
            <li
              v-for="(course, index) in data.complementary"
              :key="`course-${index}`"
              class="item">
              <course :data="course" />
            </li>
          </ul>
        </div>

        <div
          v-for="(nodeList, index) in data.nodeLists"
          :key="nodeList.title"
          :class="`${index}-wrapper has-hr avoid-page-break`">
          <h2>{{ nodeList.title }}</h2>
          <ul class="ul-nodelists">
            <li
              v-for="(node, key) in nodeList.items"
              :key="`node-${key}`"
              class="item">
              <div class="box">{{ node }}</div>
            </li>
          </ul>
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
import about from './components/cv/about'
import course from './components/cv/course'
import job from './components/cv/job'
import cvData from './assets/json/cv.json'

export default {
  name: 'CV',
  components: {
    'cv-header': cvHeader,
    about,
    course,
    job
  },
  data() {
    return {
      data: cvData,
    };
  }
}
</script>

<style lang="scss" src="./assets/scss/main.scss" />
