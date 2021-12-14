import { createStore } from 'vuex'
import user from './user'
import location from './location'

export const store = createStore({
    modules: {
        user,
        location
    },
    state: {
        preloader: false
    },
    mutations: {
        setPreloader(state, data: boolean) {
            state.preloader = data
        }
    }
})