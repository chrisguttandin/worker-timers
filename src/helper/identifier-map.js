'use strict';

function IdentifierMap() {
    this._entries = [];
    this._lastId = -1;
    this._values = [];
}

IdentifierMap.prototype.delete = function (id) {
    var index = this._entries.indexOf(id);

    if (index > -1) {
        this._entries.splice(index, 1);
        this._values.splice(index, 1);
    }
};

IdentifierMap.prototype.get = function (id) {
    var index = this._entries.indexOf(id);

    return this._values[index];
};

IdentifierMap.prototype.set = function (id, value) {
    if (arguments.length < 2) {
        value = id;

        this._lastId += 1;
        id = this._lastId;
    }

    this._entries.push(id);
    this._values.push(value);

    return id;
};

module.exports.IdentifierMap = IdentifierMap;
