var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var TableReference_1 = require('../src/interfaces/TableReference');
var mocha_1 = require("@testdeck/mocha");
var chai_1 = require('chai');
var TestTableReference = (function () {
    function TestTableReference() {
    }
    TestTableReference.prototype.testDeepCopyTableReference = function () {
        var ref = { table: 'test table', min: 4, max: 5 };
        var cp = TableReference_1.DeepCopyTableReference(ref);
        cp.table = 'copy table';
        cp.min = 10;
        cp.max = 100;
        chai_1.expect(ref.table).to.be.equal('test table');
        chai_1.expect(ref.min).to.be.equal(4);
        chai_1.expect(ref.max).to.be.equal(5);
    };
    Object.defineProperty(TestTableReference.prototype, "testDeepCopyTableReference",
        __decorate([
            mocha_1.test('Test deep copy table reference')
        ], TestTableReference.prototype, "testDeepCopyTableReference", Object.getOwnPropertyDescriptor(TestTableReference.prototype, "testDeepCopyTableReference")));
    TestTableReference = __decorate([
        mocha_1.suite
    ], TestTableReference);
    return TestTableReference;
})();
//# sourceMappingURL=tableReference.test.js.map