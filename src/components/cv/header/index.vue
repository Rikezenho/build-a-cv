<template>
  <div class="header">
    <div class="logo" v-if="data.logo"><img :src="data.logo" /></div>
    <div class="text">
      <h1><span v-if="!data.logo" :style="data.colorHighlight ? `color:${data.colorHighlight}` : ''">&raquo;</span> {{ data.title }}</h1>
      <div class="subtitulo">
        <template v-if="data.subtitle">{{ data.subtitle }} | </template>
        {{ getAge() }} anos
      </div>
    </div>
  </div>
</template>

<script>
import { differenceInYears } from 'date-fns'

export default {
  name: 'Header',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    getAge() {
      const [day, month, year] = this.data.personal.birthDate.split('/');
      return differenceInYears(
        new Date(),
        new Date(+year, +month + 1, +day)
      );
    }
  }
}
</script>
