<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
      </header>
      <section class="modal-card-body">
        <b-tabs size="is-small is-boxed" expanded>
          <b-tab-item label="Algemeen" icon="file-document-box">
            <b-field
              label="Titel"
              :type="errors.has('title') ? 'is-danger' : 'is-success'"
              :message="errors.first('title')"
              expanded>
              <b-input
                type="text"
                placeholder="Titel van label"
                v-validate.initial="'required'"
                data-vv-name="title"
                data-vv-path="value"
                v-model="label.title">
              </b-input>
            </b-field>
            <b-field grouped>
              <b-field
                label="PLU"
                :type="errors.has('plu') ? 'is-danger' : 'is-success'"
                :message="errors.first('plu')"
                expanded>
                <b-input
                  type="text"
                  placeholder="PLU nr"
                  v-validate.initial="'required|numeric'"
                  data-vv-name="plu"
                  data-vv-path="value"
                  v-model="label.plu">
                </b-input>
              </b-field>
              <b-field
                label="Categorie"
                :type="errors.has('category') ? 'is-danger' : ''"
                :message="errors.first('category')">
                <b-select
                  placeholder="Categorie"
                  data-vv-name="category"
                  data-vv-path="value"
                  v-validate=""
                  v-model="label.category">
                  <option disabled>Selecteer categorie</option>
                  <option v-for="cat in cats" :value="cat" :key="cat">{{ cat }}</option>
                </b-select>
              </b-field>
            </b-field>
            <b-field label="Omschrijving">
              <b-input
                type="textarea"
                placeholder="Omschrijving label"
                v-model="label.description">
              </b-input>
            </b-field>
            <b-field
              label="Inhoud"
              :type="errors.has('quantity') ? 'is-danger' : 'is-success'"
              :message="errors.first('quantity')"
              expanded>
              <b-input type="text"
                placeholder="Aantal gr/ltr"
                v-model="label.quantity"
                v-validate="'alpha_num'"
                data-vv-name="quantity"
                data-vv-path="value">
              </b-input>
            </b-field>
          </b-tab-item>
          <b-tab-item label="Bereiding" icon="alarm">
            <b-field grouped>
              <b-field
                label="Oven ℃"
                :type="errors.has('oven_temp') ? 'is-danger' : 'is-success'"
                :message="errors.first('oven_temp')"
                expanded>
                <b-input
                  type="text"
                  placeholder="160"
                  v-model="label.oven_temp"
                  v-validate="'numeric'"
                  data-vv-name="oven_temp"
                  data-vv-path="value">
                </b-input>
              </b-field>
              <b-field
                label="Oven min."
                :type="errors.has('oven_time') ? 'is-danger' : 'is-success'"
                :message="errors.first('oven_time')"
                expanded>
                <b-input
                  type="text"
                  placeholder="20"
                  v-model="label.oven_time"
                  v-validate="'numeric'"
                  data-vv-name="oven_time"
                  data-vv-path="value">
                </b-input>
              </b-field>
            </b-field>
            <b-field grouped>
              <b-field
                label="Magn. Watt"
                :type="errors.has('microwave_watt') ? 'is-danger' : 'is-success'"
                :message="errors.first('microwave_watt')"
                expanded>
                <b-input
                type="text"
                placeholder="600"
                v-model="label.microwave_watt"
                v-validate="'numeric'"
                data-vv-name="microwave_watt"
                data-vv-path="value">
                </b-input>
              </b-field>
              <b-field
                label="Magn. min."
                :type="errors.has('microwave_time') ? 'is-danger' : 'is-success'"
                :message="errors.first('microwave_time')"
                expanded>
                <b-input
                  type="text"
                  placeholder="7"
                  v-model="label.microwave_time"
                  v-validate="'numeric'"
                  data-vv-name="microwave_time"
                  data-vv-path="value">
                </b-input>
              </b-field>
            </b-field>
          </b-tab-item>
          <b-tab-item label="Allergenen" icon="bug">
            <b-field label="Allergenen">
              <div class="columns is-mobile">
                <div class="column" v-for="column in allergensChunk">
                  <div class="field" v-for="allergen in column">
                    <b-checkbox
                      v-model="selected"
                      :native-value="allergen">
                        {{ allergen }}
                    </b-checkbox>
                  </div>
                </div>
              </div>
            </b-field>
          </b-tab-item>
        </b-tabs>
      </section>
      <footer class="modal-card-foot">
        <button v-if="isEdit"
          class="button is-small is-success"
          type="button"
          @click.prevent="save">
          <b-icon icon="content-save"></b-icon>
          <span>Opslaan</span>
        </button>
        <button v-if="isNew"
          class="button is-small is-success"
          type="button"
          @click.prevent="savenew">
          <b-icon icon="content-save"></b-icon>
          <span>Opslaan</span>
        </button>
        <button
          class="button is-small"
          type="button"
          @click="$parent.close()">
          <b-icon icon="cancel"></b-icon>
          <span>Annuleren</span>
        </button>
        <button v-if="isEdit"
          class="button is-small is-danger"
          type="button"
          @click="confirmRemove">
          <b-icon icon="delete"></b-icon>
          <span>Verwijderen</span>
        </button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import nl from 'vee-validate/dist/locale/nl'

export default {
  data () {
    return {
      selected: [],
      allergens: [
        'Eieren',
        'Gluten',
        'Lupine',
        'Melk',
        'Mostard',
        'Noten',
        'Pinda',
        'Schaaldieren',
        'Selderij',
        'Sesamzaad',
        'Soja',
        'Sulfiet',
        'Vis',
        'Weekdieren'
      ]
    }
  },
  props: ['modalTitle'],
  computed: {
    ...mapGetters({
      categories: 'categories/getCategories',
      getActive: 'getActive',
      isNew: 'modals/isNew',
      isEdit: 'modals/isEdit'
    }),
    allergensChunk () { return _.chunk(this.allergens, this.allergens.length / 2) },
    /* remove first category 'Alles' from array */
    cats () {
      return [...this.categories].slice(1)
    },
    label () {
      return Object.assign({}, this.getActive)
    }
  },
  created () {
    this.$validator.localize('nl', {
      messages: nl.messages,
      attributes: {
        oven_temp: 'Oven temperatuur',
        oven_time: 'Oven tijd',
        microwave_watt: 'Magnetron wattage',
        microwave_time: 'Magnetron tijd',
        category: 'Categorie'
      }
    })
  },
  methods: {
    ...mapActions({
      updateLabel: 'updateLabel',
      newLabel: 'newLabel',
      resetActive: 'resetActive',
      removeLabel: 'removeLabel'
    }),
    savenew () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          this.errorDialog()
        } else {
          this.label.allergens = [...this.selected]
          if (this.newLabel(this.label)) {
            this.$toast.open({
              message: 'Label opgeslagen.',
              type: 'is-success'
            })
          }
          this.$parent.close()
        }
      })
    },
    save () {
      this.$validator.validateAll().then((result) => {
        if (!result) {
          this.errorDialog()
        } else {
          this.label.allergens = [...this.selected]
          if (this.updateLabel(this.label)) {
            this.$toast.open({
              message: 'Label bijgewerkt.',
              type: 'is-success'
            })
          }
          this.resetActive()
          this.$parent.close()
        }
      })
    },
    confirmRemove () {
      this.$dialog.confirm({
        title: 'Label verwijderen',
        message: 'Wilt u het label <em>' +
          this.label.title + '</em> echt verwijderen?',
        confirmText: 'Verwijderen',
        cancelText: 'Annuleren',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.remove()
      })
    },
    remove () {
      this.removeLabel(this.label._id)
      this.resetActive()
      this.$parent.close()
    },
    errorDialog () {
      this.$dialog.alert({
        title: 'Fout opgetreden',
        message: 'Niet alle verplichte velden ingevoerd!',
        type: 'is-danger',
        hasIcon: true
      })
    }
  },
  beforeMount () {
    /* set allergens only when in edit mode */
    if (!this.isNew) { this.selected = this.label.allergens }
  }
}
</script>
