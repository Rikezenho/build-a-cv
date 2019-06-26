<template>
  <div class="award-item">
    <i class="fa fa-trophy"></i> <span class="info">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'Award',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables.scss';

.award-item {
  display: block;
  padding: 10px 0;

  .fa-trophy {
    color: #ffcb00;
  }
}
</style>
