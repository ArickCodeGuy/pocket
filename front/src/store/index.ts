import { createStore } from 'vuex'
import user from './user'
import location from './location'

type State = {
    loged: boolean,
}

const state: State = {
    loged: false,
}

export const store = createStore({
    state,
    mutations: {
        updateLoged(state, data: State['loged']) {
            state.loged = data
        },
    },
    modules: {
        user,
        location
    }
})