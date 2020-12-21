var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var Table_1 = require('../src/interfaces/Table');
var mocha_1 = require("@testdeck/mocha");
var chai_1 = require('chai');
var TestTable = (function () {
    function TestTable() {
    }
    TestTable.prototype.testDeepCopyTable = function () {
        var t = { name: 'test table', 'version': 1.0, substitutions: true, reference: { table: 'ref table', min: 1, max: 2 } };
        var cp = Table_1.DeepCopyTable(t);
        cp.name = 'cp table';
        cp.reference.table = 'cp ref table';
        cp.substitutions = false;
        cp.reference.min = 5;
        cp.reference.max = 10;
        chai_1.expect(t.name).to.be.equal('test table');
        chai_1.expect(t.substitutions).to.be.true;
        chai_1.expect(t.reference.min).to.be.equal(1);
        chai_1.expect(t.reference.max).to.be.equal(2);
    };
    Object.defineProperty(TestTable.prototype, "testDeepCopyTable",
        __decorate([
            mocha_1.test('Test DeepCopyTable')
        ], TestTable.prototype, "testDeepCopyTable", Object.getOwnPropertyDescriptor(TestTable.prototype, "testDeepCopyTable")));
    TestTable = __decorate([
        mocha_1.suite
    ], TestTable);
    return TestTable;
})();
//# sourceMappingURL=table.test.js.map