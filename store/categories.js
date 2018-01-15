import * as types from './mutation-types'

export const state = () => ({
  list: [],
  currentCategory: 0
})

export const mutations = {
  [types.LOAD_CATEGORIES] (state, categories) {
    state.list = categories
    state.list.unshift('Alles')
  },
  [types.SET_CURRENT_CATEGORY] (state, index) {
    state.currentCategory = index
  }
}

export const getters = {
  getCategories (state) {
    return state.list
  },
  getCurrentCategory (state) {
    return state.currentCategory
  },
  getCurrentCategoryText (state) {
    return state.list[state.currentCategory]
  }
}

export const actions = {
  setCurrentCategory ({ commit }, index) {
    commit('SET_CURRENT_CATEGORY', index)
  },
  async loadCategories ({ commit }) {
    try {
      const categories = await this.$axios.$get('/categories')
      commit('LOAD_CATEGORIES', categories)
    } catch (err) {
      console.log(err.message)
    }
  }

}
