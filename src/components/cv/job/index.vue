<template>
  <div class="job-item">
    <div class="title">
      <div class="date">{{ data.date }}</div>
      <span class="text">{{ data.position }}</span>
    </div>
    <div class="provider">{{ data.provider }}</div>
    <div
      v-if="!!data.description"
      class="description">{{ data.description }}</div>
    <div
      v-if="!!data.awards"
      class="awards">
      <div
        v-for="(award, key) in data.awards"
        :key="`award-${key}`">
        <cv-award :title="award" />
      </div>
    </div>
  </div>
</template>

<script>
import cvAward from '../award'

export default {
  name: 'Job',
  components: {
    'cv-award': cvAward
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables.scss';

.job-item {
  padding: 10px 0;
  position: relative;

  .title {
    overflow: hidden;
    font-weight: 700;
    font-size: 18px;

    .date {
      border: 2px solid #ccc;
      padding: 0 10px;
      border-radius: 5px;
      float: left;
      margin-right: 5px;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .date {
        float: none;
        display: inline-block;
      }
      .text {
        display: block;
        padding-top: 10px;
      }
    }
  }
  .provider {
    color: #999;
    font-weight: 700;
  }
}
</style>
