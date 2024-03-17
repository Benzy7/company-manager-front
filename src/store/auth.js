const state = {
    token: null,
    isAuthenticated: false,
};

const mutations = {
    setToken(state, token) {
        state.token = token;
        state.isAuthenticated = !!token;
    },
};

const actions = {
    login({ commit }, token) {
        commit('setToken', token);
        localStorage.setItem('token', token);
    },
    logout({ commit }) {
        commit('setToken', null);
        localStorage.removeItem('token');
    },
};

const getters = {
    isAuthenticated: (state) => !!state.isAuthenticated,
};


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
