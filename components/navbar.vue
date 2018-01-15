<template>
  <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
        <div class="navbar-brand">
          <div class="navbar-item">
            <a href="/">
              <img src="~/assets/labella-vincenzo.svg" alt="logo"/>
            </a>
          </div>
          <div class="navbar-item is-expanded">
            <b-field expanded>
              <b-input
                v-model="search"
                type="search"
                icon="magnify"
                placeholder="Zoek PLU of titel...">
              </b-input>
            </b-field>
          </div>

          <!-- Hamburger menu -->
          <div class="navbar-burger" @click="burger = !burger" :class="{'is-active': burger}">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div class="navbar-menu" id="navMenu" :class="{'is-active': burger}">
          <div class="navbar-start">
          </div>

					<div class="navbar-end">
            <div class="navbar-item">
              <a class="button is-primary" @click="show">
                <span class="icon">
                  <i class="mdi mdi-plus"></i>
                </span>
                <span>Nieuw</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      burger: false,
      search: ''
    }
  },
  methods: {
    ...mapActions({
      setSearchText: 'search/setSearchText',
      show: 'modals/toggleNew'
    })
  },
  watch: {
    search: _.debounce(function () {
      this.setSearchText(this.search)
    }, 250)
  }
}
</script>

<style>
</style>
