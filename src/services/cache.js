function Cache() {
    let store = new Map()

    function addMany(datas) {
        store = new Map([
            ...store,
            ...datas.map(({ id, ...data }) => [JSON.stringify(id), data])
        ])
        return datas
    }

    function add({ id, ...data }) {
        store.set(JSON.stringify(id), data)
        return { id, ...data }
    }
    

    function getById(id) {
        const idStr = JSON.stringify(id)
        if (store.has(idStr)) {
            return { cache: true, data: store.get(idStr) }
        }
        return { cache: false, data: {} }
    }

    return {
        get: id => getById(id),
        set: data => add(data),
        setMany: datas => addMany(datas),
        getAll: () => [...store.entries()].map(([ idObjStr, valueObj ]) => ({ ...JSON.parse(idObjStr), ...valueObj }))
    }
}// [[jsonStringKey, restOfTheUser]]

const cache = Cache();

module.exports = cache;