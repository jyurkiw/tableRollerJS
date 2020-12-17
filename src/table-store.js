var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TableRow_1 = require('./interfaces/TableRow');
var store_1 = require('./store');
var Linq = require('linq');
exports.SubstituteRe_Search = RegExp(/[\w\s]*\{(?<name>\w*)\}/g);
var TableStore = (function (_super) {
    __extends(TableStore, _super);
    function TableStore() {
        _super.call(this);
    }
    TableStore.prototype.add = function (table) {
        if (!_super.prototype.add.call(this, table)) {
            return false;
        }
        this.processTable(table);
        return true;
    };
    TableStore.prototype.processTable = function (table) {
        this.calculateTableReferences(table);
        this.calculateWeightedIndexValues(table);
        this.calculateRowSubstitutions(table);
        return true;
    };
    TableStore.prototype.calculateTableReferences = function (table) {
        if (!table.reference) {
            return;
        }
        var referenceTarget = _super.prototype.get.call(this, table.reference.table);
        if (referenceTarget.reference) {
            this.calculateTableReferences(referenceTarget);
        }
        table.data = [];
        var rows = referenceTarget.data;
        rows = rows.slice(table.reference.min, table.reference.max + 1);
        for (var _i = 0; _i < rows.length; _i++) {
            var row = rows[_i];
            table.data.push(TableRow_1.DeepCopyTableRow(row));
        }
        delete (table.reference);
        return table;
    };
    TableStore.prototype.calculateWeightedIndexValues = function (table) {
        var totalWeight = 0;
        Linq.from(table.data).forEach(function (i) { return totalWeight += i.weight; });
        var runningWeight = 0;
        Linq.from(table.data).forEach(function (i) {
            runningWeight += i.weight / totalWeight;
            i.weightedIndex = runningWeight;
        });
        table.data[table.data.length - 1].weightedIndex = 1;
        return table;
    };
    TableStore.prototype.calculateRowSubstitutions = function (table) {
        if (!table.substitutions || !table.data)
            return table;
        var search;
        for (var idx in table.data) {
            var row = table.data[idx], as = TableRow;
            row.substitutions = [];
            while ((search = exports.SubstituteRe_Search.exec(row.value)) != null) {
                if (search.groups) {
                    row.substitutions.push(search.groups.name);
                }
            }
        }
        return table;
    };
    return TableStore;
})(store_1.Store);
exports.TableStore = TableStore;
//# sourceMappingURL=table-store.js.map