export class IdentifierMap {

    constructor () {
        this._entries = [];
        this._lastId = -1;
        this._values = [];
    }

    delete (id) {
        var index = this._entries.indexOf(id);

        if (index > -1) {
            this._entries.splice(index, 1);
            this._values.splice(index, 1);
        }
    }

    get (id) {
        var index = this._entries.indexOf(id);

        return this._values[index];
    }

    set (id, value = null) {
        if (value === null) {
            value = id;

            this._lastId += 1;
            id = this._lastId;
        }

        this._entries.push(id);
        this._values.push(value);

        return id;
    }

}
