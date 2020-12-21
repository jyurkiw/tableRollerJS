var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var roller_1 = require('../src/roller');
var mocha_1 = require("@testdeck/mocha");
var chai_1 = require('chai');
var aRow = { value: 'a', weight: 1, weightedIndex: 0.25 };
var bRow = { value: 'a', weight: 1, weightedIndex: 0.75 };
var tA = {
    'name': 'a',
    'version': 1.0,
    'data': [
        { 'value': 'a', weight: 1 },
        { 'value': 'b', weight: 1 },
        { 'value': 'c', weight: 1 },
        { 'value': 'd', weight: 1 }
    ]
};
var tB = {
    'name': 'b',
    'version': 1.0,
    'data': [
        { 'value': 'a', weight: 1 },
        { 'value': 'b', weight: 1 },
        { 'value': 'c', weight: 1 },
        { 'value': 'd', weight: 1 }
    ]
};
var rpA = { 'name': 'roll plan a', 'version': 1.0, 'rolls': [] };
var rpB = { 'name': 'roll plan b', 'version': 1.0, 'rolls': [] };
var TestRoller = (function () {
    function TestRoller() {
        this.randomNumbers = [];
        this.rand = Math.random;
    }
    TestRoller.prototype.before = function () {
        var _this = this;
        this.roller = new roller_1.Roller();
        Math.random = function () { return _this.randomNumbers.shift(); };
    };
    TestRoller.prototype.after = function () {
        Math.random = this.rand;
    };
    TestRoller.prototype.testSize_Default = function () {
        var a = this.roller.size();
        var e = { tables: 0, plans: 0 };
        chai_1.expect(a).to.deep.equal(e);
    };
    TestRoller.prototype.testSize_1_1 = function () {
        this.roller.addTable(tA);
        this.roller.addRollPlan(rpA);
        var a = this.roller.size();
        var e = { tables: 1, plans: 1 };
        chai_1.expect(a).to.deep.equal(e);
    };
    TestRoller.prototype.testAddTables_Success = function () {
        this.roller.addTables([tA, tB]);
        var a = this.roller.size();
        var e = 2;
        chai_1.expect(a.tables).to.deep.equal(e);
    };
    TestRoller.prototype.testAddRollPlans_Success = function () {
        this.roller.addRollPlans([rpA, rpB]);
        var a = this.roller.size();
        var e = 2;
        chai_1.expect(a.plans).to.deep.equal(e);
    };
    TestRoller.prototype.testBetween_rollLessThanA = function () {
        var v = 0.24;
        var e = -1;
        var a = this.roller.between(aRow, v, bRow);
        chai_1.expect(a).to.be.equal(e);
    };
    TestRoller.prototype.testBetween_rollEqualToA = function () {
        var v = 0.25;
        var e = -1;
        var a = this.roller.between(aRow, v, bRow);
        chai_1.expect(a).to.be.equal(e);
    };
    TestRoller.prototype.testBetween_rollGreaterThanA = function () {
        var v = 0.26;
        var e = 0;
        var a = this.roller.between(aRow, v, bRow);
        chai_1.expect(a).to.be.equal(e);
    };
    TestRoller.prototype.testBetween_rollLessThanB = function () {
        var v = 0.74;
        var e = 0;
        var a = this.roller.between(aRow, v, bRow);
        chai_1.expect(a).to.be.equal(e);
    };
    TestRoller.prototype.testBetween_rollEqualToB = function () {
        var v = 0.75;
        var e = 0;
        var a = this.roller.between(aRow, v, bRow);
        chai_1.expect(a).to.be.equal(e);
    };
    TestRoller.prototype.testBetween_rollGreaterThanB = function () {
        var v = 0.76;
        var e = 1;
        var a = this.roller.between(aRow, v, bRow);
        chai_1.expect(a).to.be.equal(e);
    };
    TestRoller.prototype.testExecuteSubstitutions = function () {
        var v = "{item} {bank} {puppy}";
        var s = ['sword', 'gold', 'schnowzer'];
        var e = s.join(' ');
        var a = this.roller.executeSubstitutions(v, s);
        chai_1.expect(a).be.deep.equal(e);
    };
    TestRoller.prototype.testGetRollNum_returnNumRoll = function () {
        var tRoll = { table: 'test tbl', numRolls: 4 };
        var a = this.roller.getRollNum(tRoll);
        chai_1.expect(a).to.be.equal(4);
    };
    TestRoller.prototype.testGetRollNum_minAndMax = function () {
        this.randomNumbers = [0.5];
        var tRoll = { table: 'test tbl', minRolls: 4, maxRolls: 12 };
        var a = this.roller.getRollNum(tRoll);
        chai_1.expect(a).to.be.equal(8);
    };
    TestRoller.prototype.testGetRollNum_max = function () {
        this.randomNumbers = [0.5];
        var tRoll = { table: 'test tbl', maxRolls: 12 };
        var a = this.roller.getRollNum(tRoll);
        chai_1.expect(a).to.be.equal(6);
    };
    TestRoller.prototype.testGetRollNum_one = function () {
        var tRoll = { table: 'test tbl' };
        var a = this.roller.getRollNum(tRoll);
        chai_1.expect(a).to.be.equal(1);
    };
    Object.defineProperty(TestRoller.prototype, "testSize_Default",
        __decorate([
            mocha_1.test('Test size default')
        ], TestRoller.prototype, "testSize_Default", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testSize_Default")));
    Object.defineProperty(TestRoller.prototype, "testSize_1_1",
        __decorate([
            mocha_1.test('Test size: 1 1')
        ], TestRoller.prototype, "testSize_1_1", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testSize_1_1")));
    Object.defineProperty(TestRoller.prototype, "testAddTables_Success",
        __decorate([
            mocha_1.test('Test add tables')
        ], TestRoller.prototype, "testAddTables_Success", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testAddTables_Success")));
    Object.defineProperty(TestRoller.prototype, "testAddRollPlans_Success",
        __decorate([
            mocha_1.test('Test add roll plans')
        ], TestRoller.prototype, "testAddRollPlans_Success", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testAddRollPlans_Success")));
    Object.defineProperty(TestRoller.prototype, "testBetween_rollLessThanA",
        __decorate([
            mocha_1.test('Test between: roll < a')
        ], TestRoller.prototype, "testBetween_rollLessThanA", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testBetween_rollLessThanA")));
    Object.defineProperty(TestRoller.prototype, "testBetween_rollEqualToA",
        __decorate([
            mocha_1.test('Test between: roll = a')
        ], TestRoller.prototype, "testBetween_rollEqualToA", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testBetween_rollEqualToA")));
    Object.defineProperty(TestRoller.prototype, "testBetween_rollGreaterThanA",
        __decorate([
            mocha_1.test('Test between: roll > a')
        ], TestRoller.prototype, "testBetween_rollGreaterThanA", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testBetween_rollGreaterThanA")));
    Object.defineProperty(TestRoller.prototype, "testBetween_rollLessThanB",
        __decorate([
            mocha_1.test('Test between: roll < b')
        ], TestRoller.prototype, "testBetween_rollLessThanB", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testBetween_rollLessThanB")));
    Object.defineProperty(TestRoller.prototype, "testBetween_rollEqualToB",
        __decorate([
            mocha_1.test('Test between: roll = b')
        ], TestRoller.prototype, "testBetween_rollEqualToB", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testBetween_rollEqualToB")));
    Object.defineProperty(TestRoller.prototype, "testBetween_rollGreaterThanB",
        __decorate([
            mocha_1.test('Test between: roll > b')
        ], TestRoller.prototype, "testBetween_rollGreaterThanB", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testBetween_rollGreaterThanB")));
    Object.defineProperty(TestRoller.prototype, "testExecuteSubstitutions",
        __decorate([
            mocha_1.test('Test execute substitutions')
        ], TestRoller.prototype, "testExecuteSubstitutions", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testExecuteSubstitutions")));
    Object.defineProperty(TestRoller.prototype, "testGetRollNum_returnNumRoll",
        __decorate([
            mocha_1.test('Test getRollNum: only numRolls')
        ], TestRoller.prototype, "testGetRollNum_returnNumRoll", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testGetRollNum_returnNumRoll")));
    Object.defineProperty(TestRoller.prototype, "testGetRollNum_minAndMax",
        __decorate([
            mocha_1.test('Test getRollNum: min and max')
        ], TestRoller.prototype, "testGetRollNum_minAndMax", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testGetRollNum_minAndMax")));
    Object.defineProperty(TestRoller.prototype, "testGetRollNum_max",
        __decorate([
            mocha_1.test('Test getRollNum: max')
        ], TestRoller.prototype, "testGetRollNum_max", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testGetRollNum_max")));
    Object.defineProperty(TestRoller.prototype, "testGetRollNum_one",
        __decorate([
            mocha_1.test('Test getRollNum: one')
        ], TestRoller.prototype, "testGetRollNum_one", Object.getOwnPropertyDescriptor(TestRoller.prototype, "testGetRollNum_one")));
    TestRoller = __decorate([
        mocha_1.suite
    ], TestRoller);
    return TestRoller;
})();
//# sourceMappingURL=roller.test.js.map