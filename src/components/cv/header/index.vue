<template>
  <div class="container">
    <div class="header">
      <div class="logo" v-if="data.logo"><img :src="data.logo" /></div>
      <div class="text">
        <h1><span v-if="!data.logo" :style="data.colorHighlight ? `color:${data.colorHighlight}` : ''">&raquo;</span> {{ data.title }}</h1>
        <div class="subtitulo" v-if="data.subtitle">
          {{ data.subtitle }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
}
</script>
