import * as types from './mutation-types'

export const state = () => ({
  searchText: ''
})

export const mutations = {
  [types.SET_SEARCH_TEXT] (state, text) {
    state.searchText = text
  }
}

export const getters = {
  getSearchText (state) {
    return state.searchText
  }
}

export const actions = {
  setSearchText ({ commit }, text) {
    commit('SET_SEARCH_TEXT', text)
  }
}
