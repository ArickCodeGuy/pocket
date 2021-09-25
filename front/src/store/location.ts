interface Neighbour {
    id: number,
    time: number,
    name: string,
}

const neighbour: Neighbour = {
    id: 0,
    time: 0,
    name: ''
}

interface Location {
    [index: string]: number | string | undefined | Array<Neighbour>,
    id: number,
    name: string,
    description: string,
    neighbours: Array<Neighbour>
}

const state: Location = {
    id: 0,
    name: '',
    description: '',
    neighbours: [
        neighbour
    ]
}

export default {
    state,
    mutations: {
        updateLocation(state: Location, data: Partial<Location>) {
            for(const key in data) {
                state[key] = data[key]
            }
        }
    },
    actions: {
        getLocationData({commit}: any) {
            // @TODO доделать
            return new Promise((resolve, reject) => {
                fetch(`/api/location/`)
                    .then(res => {
                        if (!res.ok) {throw res.text()}

                        return res.json()
                    })
                    .then(json => {
                        commit('updateLocation', {
                            id: json.id,
                            name: json.name,
                            description: json.description,
                            neighbours: json.neighbours
                        })
                        resolve(json)
                    })
                    .catch(async err => reject(await err))
            })
        }
    },
    getters: {
        getLocationInfo(state: Location) {
            return {
                id: state.id,
                name: state.name,
                description: state.description
            }
        },
        getLocationNeighbours(state: Location) {
            return state.neighbours
        }
    }
}