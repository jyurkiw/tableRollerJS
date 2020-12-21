var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var Table_1 = require('../src/interfaces/Table');
var table_store_1 = require('../src/table-store');
var mocha_1 = require("@testdeck/mocha");
var chai_1 = require('chai');
var sideTable = {
    'name': 'side',
    'version': 1.0,
    'data': [
        { 'value': 'left', weight: 1 },
        { 'value': 'right', weight: 1 }
    ]
};
var exTable = {
    'name': 'ex',
    'version': 1.0,
    'data': [
        { 'value': '', weight: 3 },
        { 'value': 'ex-', weight: 1 }
    ]
};
var weightingTable = {
    'name': 'weighting test table',
    'version': 1.0,
    'data': [
        { 'value': 'a', weight: 1 },
        { 'value': 'b', weight: 1 },
        { 'value': 'c', weight: 1 },
        { 'value': 'd', weight: 1 }
    ]
};
var redirTableA = {
    'name': 'redirectionA',
    'version': 1.0,
    'reference': {
        'table': 'redirection_target',
        'min': 1,
        'max': 2
    }
};
var redirTableB = {
    'name': 'redirectionB',
    'version': 1.0,
    'reference': {
        'table': 'redirection_target',
        'min': 1,
        'max': 1
    }
};
var redirTableC = {
    'name': 'redirectionC',
    'version': 1.0,
    'reference': {
        'table': 'redirection_target',
        'min': 0,
        'max': 3
    }
};
var redirTableZ = {
    'name': 'double redirection',
    'version': 1.0,
    'reference': {
        'table': 'redirectionC',
        'min': 1,
        'max': 2
    }
};
var redirTargetTable = {
    'name': 'redirection_target',
    'version': 1.0,
    'data': [
        { 'value': 'a', 'weight': 1, 'weightedIndex': 0.25 },
        { 'value': 'b', 'weight': 1, 'weightedIndex': 0.5 },
        { 'value': 'c', 'weight': 1, 'weightedIndex': 0.75 },
        { 'value': 'd', 'weight': 1, 'weightedIndex': 1 }
    ]
};
var redirExpected_1_1 = {
    'name': 'redirectionB',
    'version': 1.0,
    'data': [
        { 'value': 'b', 'weight': 1, 'weightedIndex': 1 }
    ]
};
var redirExpected_1_2 = {
    'name': 'redirectionA',
    'version': 1.0,
    'data': [
        { 'value': 'b', 'weight': 1, 'weightedIndex': 0.5 },
        { 'value': 'c', 'weight': 1, 'weightedIndex': 1 }
    ]
};
var redirExpected_0_3 = {
    'name': 'redirectionC',
    'version': 1.0,
    'data': [
        { 'value': 'a', 'weight': 1, 'weightedIndex': 0.25 },
        { 'value': 'b', 'weight': 1, 'weightedIndex': 0.5 },
        { 'value': 'c', 'weight': 1, 'weightedIndex': 0.75 },
        { 'value': 'd', 'weight': 1, 'weightedIndex': 1 }
    ]
};
var redirExpected_double = {
    'name': 'double redirection',
    'version': 1.0,
    'data': [
        { 'value': 'b', 'weight': 1, 'weightedIndex': 0.5 },
        { 'value': 'c', 'weight': 1, 'weightedIndex': 1 }
    ]
};
var noDatTable = { name: 'no data table', 'version': 1.0 };
var td = [sideTable, exTable];
var subT;
var TestTableStore = (function () {
    function TestTableStore() {
    }
    TestTableStore.prototype.before = function () {
        this.ts = new table_store_1.TableStore();
    };
    TestTableStore.prototype.testCalculateWeightedIndexValues_4rows = function () {
        var testTable = Table_1.DeepCopyTable(weightingTable);
        this.ts.calculateWeightedIndexValues(testTable);
        chai_1.expect(testTable.data[0].weightedIndex).to.equal(0.25);
        chai_1.expect(testTable.data[1].weightedIndex).to.equal(0.5);
        chai_1.expect(testTable.data[2].weightedIndex).to.equal(0.75);
        chai_1.expect(testTable.data[3].weightedIndex).to.equal(1);
    };
    TestTableStore.prototype.testAdd_Success = function () {
        this.ts.add(sideTable);
        chai_1.expect(this.ts.has(sideTable.name)).to.be.true;
    };
    TestTableStore.prototype.testAdd_Fail = function () {
        this.ts.add(sideTable);
        var actual = this.ts.add(sideTable);
        chai_1.expect(actual).to.be.false;
    };
    TestTableStore.prototype.testGet_noRedirection = function () {
        this.ts.add(sideTable);
        chai_1.expect(this.ts.get(sideTable.name)).to.be.deep.equal(sideTable);
    };
    TestTableStore.prototype.testGet_redirection_1_2 = function () {
        this.ts.addm([redirTargetTable, redirTableA]);
        chai_1.expect(this.ts.get(redirTableA.name))
            .to.be.deep.equal(redirExpected_1_2);
    };
    TestTableStore.prototype.testGet_redirection_1_1 = function () {
        this.ts.addm([redirTargetTable, redirTableB]);
        chai_1.expect(this.ts.get(redirTableB.name))
            .to.be.deep.equal(redirExpected_1_1);
    };
    TestTableStore.prototype.testGet_redirection_0_3 = function () {
        this.ts.addm([redirTargetTable, redirTableC]);
        chai_1.expect(this.ts.get(redirTableC.name))
            .to.be.deep.equal(redirExpected_0_3);
    };
    TestTableStore.prototype.testGet_multiRedirection = function () {
        this.ts.addm([redirTargetTable, redirTableC, redirTableZ]);
        chai_1.expect(this.ts.get(redirTableC.name))
            .to.be.deep.equal(redirExpected_0_3);
        chai_1.expect(this.ts.get(redirTableZ.name))
            .to.be.deep.equal(redirExpected_double);
    };
    TestTableStore.prototype.testProcessTable_success = function () {
        this.ts.add(sideTable);
        var t = this.ts.get(sideTable.name);
        chai_1.expect(t.data[0].weightedIndex).to.not.be.undefined;
    };
    TestTableStore.prototype.testCalculateRowSubstitutions_dataGuardFail = function () {
        var _this = this;
        var t = {
            'name': 'testtbl',
            'version': 1.0
        };
        chai_1.expect(function () { return _this.ts.calculateRowSubstitutions(t); })
            .to.not.throw();
        chai_1.expect(t.data).to.be.undefined;
    };
    TestTableStore.prototype.testCalculateRowSubstitutions_substitutionFlagGuard = function () {
        var t = {
            'name': 'testtbl',
            'version': 1.0,
            'data': [
                { 'value': '{test}', 'weight': 1 }
            ]
        };
        this.ts.calculateRowSubstitutions(t);
        chai_1.expect(t.data[0].substitutions).to.be.undefined;
    };
    TestTableStore.prototype.testCalculateRowSubstitutions_success = function () {
        var t = {
            'name': 'substitution table',
            'version': 1.0,
            'substitutions': true,
            'data': [
                { 'value': 'we {ship} this', weight: 1 },
                { 'value': 'we {boat} {that}', weight: 1 }
            ]
        };
        this.ts.calculateRowSubstitutions(t);
        chai_1.expect(t.data[0].substitutions).to.not.be.undefined;
        chai_1.expect(t.data[0].substitutions).to.deep.equal(['ship']);
        chai_1.expect(t.data[1].substitutions).to.not.be.undefined;
        chai_1.expect(t.data[1].substitutions).to.deep.equal(['boat', 'that']);
    };
    Object.defineProperty(TestTableStore.prototype, "testCalculateWeightedIndexValues_4rows",
        __decorate([
            mocha_1.test('Test calculate weighted index values: 4 rows')
        ], TestTableStore.prototype, "testCalculateWeightedIndexValues_4rows", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testCalculateWeightedIndexValues_4rows")));
    Object.defineProperty(TestTableStore.prototype, "testAdd_Success",
        __decorate([
            mocha_1.test('Test add overload')
        ], TestTableStore.prototype, "testAdd_Success", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testAdd_Success")));
    Object.defineProperty(TestTableStore.prototype, "testAdd_Fail",
        __decorate([
            mocha_1.test('Test add overload failure')
        ], TestTableStore.prototype, "testAdd_Fail", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testAdd_Fail")));
    Object.defineProperty(TestTableStore.prototype, "testGet_noRedirection",
        __decorate([
            mocha_1.test('Test get no redirection')
        ], TestTableStore.prototype, "testGet_noRedirection", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testGet_noRedirection")));
    Object.defineProperty(TestTableStore.prototype, "testGet_redirection_1_2",
        __decorate([
            mocha_1.test('Test get with redirection 1 2')
        ], TestTableStore.prototype, "testGet_redirection_1_2", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testGet_redirection_1_2")));
    Object.defineProperty(TestTableStore.prototype, "testGet_redirection_1_1",
        __decorate([
            mocha_1.test('Test get with redirection 1 1')
        ], TestTableStore.prototype, "testGet_redirection_1_1", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testGet_redirection_1_1")));
    Object.defineProperty(TestTableStore.prototype, "testGet_redirection_0_3",
        __decorate([
            mocha_1.test('Test get with redirection 0 3')
        ], TestTableStore.prototype, "testGet_redirection_0_3", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testGet_redirection_0_3")));
    Object.defineProperty(TestTableStore.prototype, "testGet_multiRedirection",
        __decorate([
            mocha_1.test('Test get with multiple redirections')
        ], TestTableStore.prototype, "testGet_multiRedirection", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testGet_multiRedirection")));
    Object.defineProperty(TestTableStore.prototype, "testProcessTable_success",
        __decorate([
            mocha_1.test('Test processTable: table processes weighted indicies')
        ], TestTableStore.prototype, "testProcessTable_success", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testProcessTable_success")));
    Object.defineProperty(TestTableStore.prototype, "testCalculateRowSubstitutions_dataGuardFail",
        __decorate([
            mocha_1.test('Test calculateRowSubstitutions data flag guard')
        ], TestTableStore.prototype, "testCalculateRowSubstitutions_dataGuardFail", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testCalculateRowSubstitutions_dataGuardFail")));
    Object.defineProperty(TestTableStore.prototype, "testCalculateRowSubstitutions_substitutionFlagGuard",
        __decorate([
            mocha_1.test('Test calculateRowSubstitutions substitution flag guard')
        ], TestTableStore.prototype, "testCalculateRowSubstitutions_substitutionFlagGuard", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testCalculateRowSubstitutions_substitutionFlagGuard")));
    Object.defineProperty(TestTableStore.prototype, "testCalculateRowSubstitutions_success",
        __decorate([
            mocha_1.test('Test calculateRowSubstitutions success')
        ], TestTableStore.prototype, "testCalculateRowSubstitutions_success", Object.getOwnPropertyDescriptor(TestTableStore.prototype, "testCalculateRowSubstitutions_success")));
    TestTableStore = __decorate([
        mocha_1.suite
    ], TestTableStore);
    return TestTableStore;
})();
//# sourceMappingURL=table-store.test.js.map