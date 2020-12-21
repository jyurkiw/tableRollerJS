var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var TableRow_1 = require('../src/interfaces/TableRow');
var mocha_1 = require("@testdeck/mocha");
var chai_1 = require('chai');
var TestTableRow = (function () {
    function TestTableRow() {
    }
    TestTableRow.prototype.testDeepCopyTableRow = function () {
        var tr = { value: 'row value', weight: 10, weightedIndex: 0.5, substitutions: ['one', 'two'] };
        var cp = TableRow_1.DeepCopyTableRow(tr);
        cp.value = 'copy value';
        cp.weight = 100;
        cp.weightedIndex = 1;
        cp.substitutions = ['three', 'four'];
        chai_1.expect(tr.value).to.be.equal('row value');
        chai_1.expect(tr.weight).to.be.equal(10);
        chai_1.expect(tr.weightedIndex).to.be.equal(0.5);
        chai_1.expect(tr.substitutions).to.be.deep.equal(['one', 'two']);
    };
    Object.defineProperty(TestTableRow.prototype, "testDeepCopyTableRow",
        __decorate([
            mocha_1.test('test DeepCopyTableRow')
        ], TestTableRow.prototype, "testDeepCopyTableRow", Object.getOwnPropertyDescriptor(TestTableRow.prototype, "testDeepCopyTableRow")));
    TestTableRow = __decorate([
        mocha_1.suite
    ], TestTableRow);
    return TestTableRow;
})();
//# sourceMappingURL=tableRow.test.js.map