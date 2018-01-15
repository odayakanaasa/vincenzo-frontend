import * as types from './mutation-types'

export const state = () => ({
  isNew: false,
  isEdit: false
})

export const mutations = {
  [types.TOGGLE_NEW] (state) {
    state.isNew = !state.isNew
  },
  [types.TOGGLE_EDIT] (state) {
    state.isEdit = !state.isEdit
  }
}

export const getters = {
  isNew (state) {
    return state.isNew
  },
  isEdit (state) {
    return state.isEdit
  }
}

export const actions = {
  toggleNew ({ commit }) {
    commit('TOGGLE_NEW')
  },
  toggleEdit ({ commit }) {
    commit('TOGGLE_EDIT')
  }
}
