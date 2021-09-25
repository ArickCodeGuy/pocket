type Location = {
    id: number,
    name: string,
    description: string,
    neighbours: [
        {
            id: number,
            time: number,
            name: string
        }
    ]
}

const state: Location = {
    id: 0,
    name: '',
    description: '',
    neighbours: [
        {
            id: 0,
            time: 0,
            name: ''
        }
    ]
}

export default {
    state,
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
                            description: json.description
                        })
                        resolve(json)
                    })
                    .catch(async err => reject(await err))
            })
        }
    },
}