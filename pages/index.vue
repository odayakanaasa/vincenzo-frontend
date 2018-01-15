<template>
  <div>
    <add></add>
    <edit></edit>
    <navbar></navbar>
    <hero></hero>
    <list></list>
  </div>
</template>

<script>
import add from '~/components/modals/add'
import edit from '~/components/modals/edit'
import navbar from '~/components/navbar'
import hero from '~/components/hero'
import list from '~/components/list'

export default {
  components: {
    add,
    edit,
    navbar,
    hero,
    list
  }
}
</script>

<style>
</style>
