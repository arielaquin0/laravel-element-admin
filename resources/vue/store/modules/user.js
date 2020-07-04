
import { getToken, setToken, removeToken } from '../../utils/auth'
// import router, { resetRouter } from '../../router'

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
