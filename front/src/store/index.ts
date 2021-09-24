import { createStore } from 'vuex'

export type State = {
    loged: boolean,
    location: {
        id: number,
        name: string,
        description: string,
        neighbours: [{
            id: number,
            name: string
        }],
    },
    user: {
        [index: string]: number | string | undefined,
        name: string,
        profile_picture: string,
        lvl: number,
        experience: number,
        class_id: number,
        base_strength: number,
        base_stamina: number,
        base_agility: number,
        inventory_head: number,
        inventory_boots: number,
        inventory_left_hand: number,
        inventory_right_hand: number,
        inventory_neck: number
    }
}

const state: State = {
    loged: false,
    location: {
        id: NaN,
        name: '',
        description: '',
        neighbours: [{
            id: NaN,
            name: ''
        }],
    },
    user: {
        name: '',
        profile_picture: '',
        lvl: NaN,
        class_id: NaN,
        experience: NaN,
        base_strength: NaN,
        base_stamina: NaN,
        base_agility: NaN,
        inventory_boots: NaN,
        inventory_left_hand: NaN,
        inventory_right_hand: NaN,
        inventory_head: NaN,
        inventory_neck: NaN,
    }
}

export const store = createStore({
    state,
    mutations: {
        updateUserData(state, data: Partial<State['user']>) {
            for (const key in data) {
                state.user[key] = data[key]
            }
        },
        updateLoged(state, data: State['loged']) {
            state.loged = data
        },
        updateLocation(state, data) {
            state.location.id = data.id
            state.location.name = data.name
            state.location.description = data.description
        }
    },
    actions: {
        doLogin({commit}, data) {
            return new Promise((resolve, reject) => {
                fetch(`/api/users/login?login=${data.login}&password=${data.password}`)
                    .then(res => {
                        if (!res.ok) {throw res.text()}
                        return res.json()
                    })
                    .then(json => {
                        if (json.session_id) {
                            document.cookie = `session_id=${json.session_id}`
                        }
                        commit('updateUserData', {
                            login: data.login,
                        })
                        commit('updateLoged', true)
                        resolve(json)
                    })
                    .catch(async err => reject(await err))
            })
        },
        getProfile({commit}) {
            return new Promise((resolve, reject) => {
                fetch('/api/users/')
                    .then(res => {
                        if (!res.ok) {throw res.text()}
                        return res.json()
                    })
                    .then(json => {
                        commit('updateUserData', json)
                        resolve(json)
                    })
                    .catch( async err => reject(await err))
            })
        },
        checkStatus({commit}) {
            return new Promise((resolve, reject) => {
                fetch('/api/users/get_status/')
                    .then(res => {
                        if (!res.ok) {throw res.text()}
                        return res.json()
                    })
                    .then(json => {
                        commit('updateLoged', json.loged)
                        resolve(json)
                    })
                    .catch( async err => reject(await err))
            })
        },
        getLocationData({commit}) {
            return new Promise((resolve, reject) => {
                fetch(`/api/location/?location_id=${state.user.location_id}`)
                    .then(res => {
                        if (!res.ok) {throw res.text()}

                        return res.json()
                    })
                    .then(json => {
                        commit('updateLocation', {
                            id: json.id,
                            name: json.name,
                            description: json.description
                        })
                        resolve(json)
                    })
                    .catch(async err => reject(await err))
            })
        }
        // doRegister({commit}, data) {
        //     commit('updateUserData', {
        //         login: data.login,
        //     })
        // }
    },
    modules: {
    },
    getters: {
        // getStatus: (state: any) => {
        //     return state.status
        // },
    }
})