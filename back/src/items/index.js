const queryDataBase = require('./../queryDatabase.js')

module.exports = {
    // owner -> character_id
    async generateItem(owner, item_id) {
        try {
            // get prototype of item by item id
            const item_proto = await queryDataBase()[0]

            const item = {
                proto_id: item_proto.id,
                created: new Date().getTime(),
            }
            // item types ???
            if (item_proto.item_type === '') {

            }

            // insert item in items table
            await queryDataBase()
        }
        catch(err) { res.status(err.status).send(err.text) }
    } 
}