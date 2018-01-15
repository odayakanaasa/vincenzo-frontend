import * as types from './mutation-types'

export const state = () => ({
  list: [],
  active: 0
})

export const mutations = {
  [types.LOAD_LABELS] (state, labels) {
    state.list = labels
  },
  [types.NEW_LABEL] (state, label) {
    state.list.push(label)
  },
  /* update label state with mongodb data */
  [types.UPDATE_LABEL] (state, label) {
    const index = state.list.findIndex(l => l._id === label._id)
    state.list[index].plu = label.plu
    state.list[index].title = label.title
    state.list[index].description = label.description
    state.list[index].category = label.category
    state.list[index].quantity = label.quantity
    state.list[index].oven_temp = label.oven_temp
    state.list[index].oven_time = label.oven_time
    state.list[index].allergens = label.allergens
    state.list[index].microwave_watt = label.microwave_watt
    state.list[index].microwave_time = label.microwave_time
    state.list[index].modifiedAt = label.modifiedAt
  },
  [types.REMOVE_LABEL] (state, id) {
    const index = state.list.findIndex(l => l._id === id)
    state.list.splice(index, 1)
  },
  [types.SET_ACTIVE] (state, id) {
    state.active = id
  },
  [types.RESET_ACTIVE] (state, id) {
    state.active = 0
  }
}

export const getters = {
  /* filter list array based on category, searchtext and plu code */
  filterLabels (state, getters) {
    let list = state.list
    /* current search text from user */
    const search = getters['search/getSearchText']
    /* active category user selected */
    const currentCategoryText = getters['categories/getCurrentCategoryText']

    /* if current category is bigger then 0 return only labels for current category */
    if (state.categories.currentCategory > 0) {
      list = list.filter(l => l.category === currentCategoryText)
    }

    /* if search is digits only, filter on plu */
    if (/^\d+$/.test(search)) {
      return list.filter(l => RegExp('^' + search + '+').test(l.plu))
    }

    /* if search is text, filter by title */
    return list.filter(l => l.title.toLowerCase().includes(search.toLowerCase()))
  },
  /* find active label and return the result */
  getActive (state) {
    const index = state.list.findIndex(l => l._id === state.active)
    return state.list[index]
  }
}

export const actions = {
  /* at init fetch labels using loadLabels */
  async nuxtServerInit ({ commit }) {
    /* get categories from api server */
    this.dispatch('categories/loadCategories')

    /* get labels from api server */
    try {
      const labels = await this.$axios.$get('/labels')
      commit('LOAD_LABELS', labels)
    } catch (err) {
      console.log(err.message)
    }
  },
  setActive ({ commit }, id) {
    commit('SET_ACTIVE', id)
  },
  resetActive ({ commit }) {
    commit('RESET_ACTIVE')
  },
  async newLabel ({ commit }, label) {
    try {
      await this.$axios.$post('/labels', label)
      commit('NEW_LABEL', label)
    } catch (err) {
      console.log(err)
    }
  },
  async updateLabel ({ commit, getters }, label) {
    try {
      /* save label to database */
      label.modifiedAt = Date.now()
      await this.$axios.$put('/labels/' + label._id, label)
      /* update state.list */
      commit('UPDATE_LABEL', label)
    } catch (err) {
      console.log(err)
    }
  },
  async removeLabel ({ commit }, id) {
    try {
      this.$axios.$delete('/labels/' + id)
      commit('REMOVE_LABEL', id)
    } catch (err) {
      console.log(err)
    }
  }
}
