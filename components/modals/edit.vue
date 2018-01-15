<template>
  <section>
    <b-modal :active="show" has-modal-card :onCancel="close">
      <form-label modalTitle="Wijzig label"></form-label>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import formLabel from './formLabel'

export default {
  computed: {
    ...mapGetters({
      show: 'modals/isEdit'
    })
  },
  methods: {
    ...mapActions({
      toggle: 'modals/toggleEdit',
      resetActive: 'resetActive'
    }),
    close () {
      this.resetActive()
      this.toggle()
    }
  },
  components: {
    formLabel
  }
}
</script>

<style>
</style>
