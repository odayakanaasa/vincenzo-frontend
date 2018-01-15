<template>
  <section class="hero is-warning">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Label overzicht
        </h1>
        <h2 class="subtitle">
          <strong>{{ list.length }}</strong> labels
          <span v-if="searchText.length != 0"> voor <span class="tag is-danger is-size-5">
          <em>{{ searchText }}</em></span></span> in {{ currentCategoryText }}
        </h2>
      </div>
    </div>
    <div class="hero-foot">
      <div class="container">
        <b-tabs type="is-boxed" expanded @change="setCurrentCategory">
          <b-tab-item v-for="tab, id in tabs" :key="id" :label="tab">
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      list: 'filterLabels',
      tabs: 'categories/getCategories',
      currentCategory: 'categories/getCurrentCategory',
      currentCategoryText: 'categories/getCurrentCategoryText',
      searchText: 'search/getSearchText'
    })
  },
  methods: {
    ...mapActions({
      setCurrentCategory: 'categories/setCurrentCategory'
    })
  }
}
</script>

<style lang="scss" scoped>
  .container { height: 40px; }
</style>
