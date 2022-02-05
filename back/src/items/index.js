const queryDataBase = require('./../queryDatabase.js')

module.exports = {
    // owner -> character_id
    async generateItem(owner, item_id) {
        try {
            if (!owner) { throw {status: 400, text: 'no owner provided'}}
            if (!item_id) { throw {status: 400, text: 'no item_id provided'}}
            // get prototype of item by item id
            const item_proto = await queryDataBase("SELECT * FROM pocket.items_prototypes WHERE id = "+item_id+";")

            const item = {
                proto_id: item_proto[0].id,
                created: new Date().getTime(),
            }

            // insert item in items table
            await queryDataBase()
        }
        catch(err) {
            console.log(err)
            res.status(err.status).send(err.text)
        }
    }
}