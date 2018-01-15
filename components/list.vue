<template>
  <div class="section">
    <div class='container'>
      <b-table
      :data="isEmpty(list) ? [] : list"
      :striped="true"
      :hoverable="false"
      :mobile-cards="true"
      default-sort="title"
      default-sort-direction="asc"
      paginated
      :current-page.sync="currentPage">
        <template slot-scope="props">
          <b-table-column field="plu" label="PLU" width="30" numeric sortable>
            <span class="tag is-warning is-large"><strong>{{ props.row.plu }}</strong></span>
          </b-table-column>
          <b-table-column field="title" label="Titel" sortable>
            <a @click.prevent="edit(props.row._id)"><strong>{{ props.row.title }}</strong></a>
            <div class="content">
              <p v-if="props.row.description.length">
                {{ props.row.description }}
              </p>
              <p v-else class="has-text-danger">
                Geen omschrijving!
              </p>
              <small class="has-text-dark has-text-weight-light">
                {{ props.row.modifiedAt | moment }} gewijzigd
              </small>
            </div>
          </b-table-column>
          <b-table-column field="quantity" label="Inhoud">
            {{ props.row.quantity }}
          </b-table-column>
          <b-table-column field="oven_temp" label="Bereiding" width="150" centered>
            <b-taglist v-if="props.row.oven_temp" attached>
              <b-tag type="is-dark" rounded>{{ props.row.oven_temp }} ℃</b-tag>
              <b-tag type="is-primary" rounded>{{ props.row.oven_time}} min</b-tag>
            </b-taglist>
            <b-taglist v-if="props.row.microwave_watt" attached>
              <b-tag type="is-dark" rounded>{{ props.row.microwave_watt }} W</b-tag>
              <b-tag type="is-primary" rounded>{{ props.row.microwave_time }} min</b-tag>
            </b-taglist>
          </b-table-column>
          <b-table-column field="category" label="Categorie">
            {{ props.row.category }}
          </b-table-column>
          <b-table-column field="print" label="Print">
            <a @click="printLabel(props.row._id)" class="button is-success">
              <span class="icon">
                <i class="mdi mdi-printer"></i>
              </span>
              <span>Print</span>
            </a>
          </b-table-column>
        </template>
        <template slot="empty">
          <section class="section">
            <div class="content has-text-grey has-text-centered">
              <p>
                <b-icon
                  icon="emoticon-sad"
                  size="is-large">
                </b-icon>
              </p>
              <p>Geen labels gevonden.</p>
            </div>
          </section>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import 'moment/locale/nl'
moment.locale('nl')

export default {
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters({
      list: 'filterLabels',
      category: 'categories/getCurrentCategory'
    })
  },
  methods: {
    ...mapActions({
      toggleEdit: 'modals/toggleEdit',
      setActive: 'setActive'
    }),
    isEmpty (obj) {
      return Object.keys(obj).length === 0
    },
    edit (id) {
      this.setActive(id)
      this.toggleEdit()
    },
    printLabel (id) {
      this.$axios.$get('labels/print/' + id)
      this.$toast.open({
        message: 'Print opdracht verzonden',
        type: 'is-success'
      })
    }
  },
  watch: {
    /* if user changes tab return first page */
    category (val, old) {
      this.currentPage = 1
    }
  },
  filters: {
    /* return last modified date for label */
    moment (value) {
      return moment(value).fromNow()
    }
  }
}
</script>

<style>
</style>
