<template>
  <section>
    <b-modal :active="show" has-modal-card :onCancel="close">
      <form-label modalTitle="Nieuw Label" :label="label"></form-label>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import formLabel from './formLabel'

export default {
  data () {
    return {
      label: {}
    }
  },
  computed: {
    ...mapGetters({
      show: 'modals/isNew'
    })
  },
  methods: {
    ...mapActions({
      toggle: 'modals/toggleNew'
    }),
    close () {
      this.toggle()
    }
  },
  components: {
    formLabel
  }
}
</script>

<style>
.modal {
  z-index: 40;
}
</style>
