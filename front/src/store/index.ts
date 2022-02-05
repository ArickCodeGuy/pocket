import { createStore } from 'vuex'
import user from './user'
import location from './location'

type Theme = 'light' | 'dark' | undefined

type BooleanNull = boolean | null

type UserId = number | null

interface State {
    preloader: {
        [index: string]: boolean
    }
    status: BooleanNull
    user_id: UserId
    is_admin: BooleanNull
    theme: Theme
}

const state: State = {
    preloader: {},
    status: null,
    user_id: null,
    is_admin: null,
    theme: localStorage.theme
}

const store = createStore({
    modules: {
        user,
        location
    },
    state,
    mutations: {
        setPreloader(state, data: {key: string, status: boolean}) {
            if (data.status === false) {
                delete state.preloader[data.key]
            }else {
                state.preloader[data.key] = data.status
            }
        },
        setStatus(state, data: {status: BooleanNull, user_id: UserId, is_admin: BooleanNull}) {
            state.status = data.status
            state.user_id = data.user_id
            state.is_admin = data.is_admin
        },
        setTheme(state, theme: Theme) {
            state.theme = theme
            localStorage.theme = theme
            document.body.classList.remove('theme-dark', 'theme-light')
            localStorage.theme === 'dark' ? document.body.classList.add('theme-dark'): false;
            localStorage.theme === 'light' ? document.body.classList.add('theme-light'): false;
        }
    },
    actions: {
        changeTheme({commit}, theme: Theme) {
            commit('setTheme', theme)
        },
        async checkStatus({commit}) {
            let json = {
                status: false,
                user_id: null,
                is_admin: false,
            }
            try {
                const response = await fetch('/api/users/get_status/')
                if (!response.ok) {throw response.text()}
                json = await response.json()
            }
            catch(err){
                console.log(await err)
            }
            commit('setStatus', json)
        },
    }
})

!localStorage.theme ? localStorage.theme = 'light': false;
store.dispatch('changeTheme', localStorage.theme);

export default store