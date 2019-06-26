<template>
  <div class="about">
    <div class="content">
      <div class="block">
        <div
          v-for="contact in data.contacts"
          :key="contact.icon"
          class="item"
        >
          <template v-if="contact.href">
            <a
              :href="contact.href"
              target="_blank"
            >
              <i :class="`fa fa-${contact.icon}`"></i>{{contact.text}}
            </a>
          </template>
          <template v-else>
            <i :class="`fa fa-${contact.icon}`"></i>{{contact.text}}
          </template>
        </div>
      </div>
      <div
        v-if="!!data.personal.address"
        class="block"
        title="Endereço">
        <i class="fa fa-map-marker"></i> {{ data.personal.address }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
  .fa {
    margin-right: 5px;
  }
</style>

