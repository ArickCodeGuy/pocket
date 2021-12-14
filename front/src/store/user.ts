type User = {
    [index: string]: number | string | undefined | boolean,
    loaded: boolean,
    name: string,
    profile_picture: string,
    lvl: number,
    experience: number,
    class_id: number,
    base_strength: number,
    base_stamina: number,
    base_agility: number,
    base_wisdom: number,
    base_luck: number,
    free_attributes: number,
    inventory_head: number,
    inventory_boots: number,
    inventory_left_hand: number,
    inventory_right_hand: number,
    inventory_neck: number,
    calculated_health: number,
    calculated_mana: number,
    calculated_weight: number,
    current_health: number,
    current_mana: number,
    current_weight: number,
}

const state: User = {
    name: '',
    loaded: false,
    profile_picture: '',
    lvl: 0,
    experience: 0,
    class_id: 0,
    base_strength: 0,
    base_stamina: 0,
    base_agility: 0,
    base_wisdom: 0,
    base_luck: 0,
    free_attributes: 0,
    inventory_head: 0,
    inventory_boots: 0,
    inventory_left_hand: 0,
    inventory_right_hand: 0,
    inventory_neck: 0,
    calculated_health: 0,
    calculated_mana: 0,
    calculated_weight: 0,
    current_health: 0,
    current_mana: 0,
    current_weight: 0,
}

export default {
    state,
    mutations: {
        updateUserData(state: User, data: Partial<User>) {
            for (const key in data) {
                state[key] = data[key]
            }
            state.loaded = true
        },
    },
    actions: {
        doLogin({commit}: any, data: any) {
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
                        resolve(json)
                    })
                    .catch(async err => reject(await err))
            })
        },
        getProfile({commit}: any) {
            return new Promise((resolve, reject) => {
                fetch('/api/users/')
                    .then(res => {
                        if (!res.ok) {throw res.text()}
                        return res.json()
                    })
                    .then(data => {
                        commit('updateUserData', data)
                        resolve(data)
                    })
                    .catch( async err => reject(await err))
            })
        },
        checkStatus({commit}: any) {
            return new Promise((resolve, reject) => {
                fetch('/api/users/get_status/')
                    .then(res => {
                        if (!res.ok) {throw res.text()}
                        return res.json()
                    })
                    .then(json => {
                        resolve(json)
                    })
                    .catch(async err => reject(await err))
            })
        },
        useRoute(store: any, data: number) {
            return new Promise((resolve, reject) => {
                fetch(`/api/users/go/?location_id=${data}`)
                    .then(res => {
                        if (!res.ok) {throw res.text()}
                        return resolve(res.json())
                    })
                    .catch(async err => reject(await err))
            })
        },
        requestAttributesChange(store: any, data: Partial<User>)  {
            return new Promise((resolve, reject) => {
                fetch(`/api/users/set_attributes/`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data),
                })
                    .then(res => {
                        if(!res.ok) {throw res.text()}
                        return res.json()
                    })
                    .then((json: Partial<User>) => {
                        store.commit('updateUserData', json)
                        resolve(json)
                    })
                    .catch(async err => reject(await err))
            })
        }
    }
}