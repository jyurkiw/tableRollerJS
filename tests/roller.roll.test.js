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
var Linq = require('linq');
var psuedoRandomNums = [];
var rand = Math.random;
var TestRoller_RollFunction = (function () {
    function TestRoller_RollFunction() {
    }
    TestRoller_RollFunction.prototype.before = function () {
        this.roller = new roller_1.Roller();
        Math.random = function () { return psuedoRandomNums.shift(); };
    };
    TestRoller_RollFunction.prototype.after = function () {
        Math.random = rand;
    };
    TestRoller_RollFunction.prototype.createTableRow = function (value, weight) {
        if (weight === void 0) { weight = 1; }
        return {
            value: value,
            weight: weight
        };
    };
    TestRoller_RollFunction.prototype.createTableRows = function (values, weights) {
        var _this = this;
        var w = weights && weights.length >= values.length;
        return Linq
            .range(0, values.length)
            .select(function (i) { return _this.createTableRow(values[i], w ? weights[i] : 1); })
            .toArray();
    };
    TestRoller_RollFunction.prototype.createTable = function (name, data, substitutions, reference) {
        var t = {
            name: name,
            version: 1.0
        };
        if (data)
            t.data = data;
        if (substitutions)
            t.substitutions = substitutions;
        if (reference)
            t.reference = reference;
        this.roller.addTable(t);
        return t;
    };
    TestRoller_RollFunction.prototype.createPlan = function (name, rolls) {
        this.roller.addRollPlan({
            name: name,
            version: 1.0,
            rolls: rolls
        });
    };
    TestRoller_RollFunction.prototype.createTableRoll = function (table, num, min, max) {
        if (num === void 0) { num = 1; }
        return {
            table: table.name,
            minRolls: min,
            maxRolls: max,
            numRolls: num
        };
    };
    TestRoller_RollFunction.prototype.testRollNumbersTable_one = function () {
        var t = this.createTable('number table', this.createTableRows(['one', 'two', 'three', 'four']));
        this.createPlan('number plan', [
            this.createTableRoll(t)
        ]);
        var a = Linq.from(this.roller.roll('number plan', [0.15])).first();
        chai_1.expect(a).to.be.equal('one');
    };
    TestRoller_RollFunction.prototype.testRollNumbersTable_two = function () {
        var t = this.createTable('number table', this.createTableRows(['one', 'two', 'three', 'four']));
        this.createPlan('number plan', [
            this.createTableRoll(t)
        ]);
        var a = Linq.from(this.roller.roll('number plan', [0.35])).first();
        chai_1.expect(a).to.be.equal('two');
    };
    TestRoller_RollFunction.prototype.testRollNumbersTable_three = function () {
        var t = this.createTable('number table', this.createTableRows(['one', 'two', 'three', 'four']));
        this.createPlan('number plan', [
            this.createTableRoll(t)
        ]);
        var a = Linq.from(this.roller.roll('number plan', [0.65])).first();
        chai_1.expect(a).to.be.equal('three');
    };
    TestRoller_RollFunction.prototype.testRollNumbersTable_four = function () {
        var t = this.createTable('number table', this.createTableRows(['one', 'two', 'three', 'four']));
        this.createPlan('number plan', [
            this.createTableRoll(t)
        ]);
        var a = Linq.from(this.roller.roll('number plan', [0.85])).first();
        chai_1.expect(a).to.be.equal('four');
    };
    TestRoller_RollFunction.prototype.testRollSubstitutionTable_one = function () {
        var numbers = this.createTable('numbers', this.createTableRows(['one', 'two', 'three', 'four']));
        var numSub = this.createTable('numbers substitution table', this.createTableRows([
            '{numbers}',
            '{numbers}{numbers}',
            '{numbers}{numbers}{numbers}',
            '{numbers}{numbers}{numbers}{numbers}']), true);
        this.createPlan('numSub plan', [this.createTableRoll(numSub)]);
        psuedoRandomNums = [0.35];
        var a = Linq.from(this.roller.roll('numSub plan', [0.15])).first();
        chai_1.expect(a).to.be.equal('two');
    };
    TestRoller_RollFunction.prototype.testRollSubstitutionTable_onetwo = function () {
        var numbers = this.createTable('numbers', this.createTableRows(['one', 'two', 'three', 'four']));
        var numSub = this.createTable('numbers substitution table', this.createTableRows([
            '{numbers}',
            '{numbers}{numbers}',
            '{numbers}{numbers}{numbers}',
            '{numbers}{numbers}{numbers}{numbers}']), true);
        this.createPlan('numSub plan', [this.createTableRoll(numSub)]);
        psuedoRandomNums = [0.15, 0.35];
        var a = Linq.from(this.roller.roll('numSub plan', [0.35])).first();
        chai_1.expect(a).to.be.equal('onetwo');
    };
    TestRoller_RollFunction.prototype.testRollSubstitutionTable_onetwothree = function () {
        var numbers = this.createTable('numbers', this.createTableRows(['one', 'two', 'three', 'four']));
        var numSub = this.createTable('numbers substitution table', this.createTableRows([
            '{numbers}',
            '{numbers}{numbers}',
            '{numbers}{numbers}{numbers}',
            '{numbers}{numbers}{numbers}{numbers}']), true);
        this.createPlan('numSub plan', [this.createTableRoll(numSub)]);
        psuedoRandomNums = [0.15, 0.35, 0.65];
        var a = Linq.from(this.roller.roll('numSub plan', [0.65])).first();
        chai_1.expect(a).to.be.equal('onetwothree');
    };
    TestRoller_RollFunction.prototype.testRollSubstitutionTable_onetwothreefour = function () {
        var numbers = this.createTable('numbers', this.createTableRows(['one', 'two', 'three', 'four']));
        var numSub = this.createTable('numbers substitution table', this.createTableRows([
            '{numbers}',
            '{numbers}{numbers}',
            '{numbers}{numbers}{numbers}',
            '{numbers}{numbers}{numbers}{numbers}']), true);
        this.createPlan('numSub plan', [this.createTableRoll(numSub)]);
        psuedoRandomNums = [0.15, 0.35, 0.65, 0.85];
        var a = Linq.from(this.roller.roll('numSub plan', [0.85])).first();
        chai_1.expect(a).to.be.equal('onetwothreefour');
    };
    TestRoller_RollFunction.prototype.testRollSubstitutionTable_nestedSubstitution_ofone = function () {
        var numbers = this.createTable('numbers', this.createTableRows(['one', 'two', 'three', 'four']));
        var numSub = this.createTable('numSub', this.createTableRows([
            'of {numbers}',
            'hi {numbers}',
            'ho {numbers}',
            'nu {numbers}']), true);
        var numSubSub = this.createTable('numbers substitution substitution table', this.createTableRows([
            '{numSub}',
            '{numSub}{numSub}',
            '{numSub}{numSub}{numSub}',
            '{numSub}{numSub}{numSub}{numSub}']), true);
        this.createPlan('numSubSub plan', [this.createTableRoll(numSubSub)]);
        psuedoRandomNums = [0.15, 0.15];
        var a = Linq.from(this.roller.roll('numSubSub plan', [0.15])).first();
        chai_1.expect(a).to.be.equal('of one');
    };
    TestRoller_RollFunction.prototype.testRollSubstitutionTable_nestedSubstitution_hitwo = function () {
        var numbers = this.createTable('numbers', this.createTableRows(['one', 'two', 'three', 'four']));
        var numSub = this.createTable('numSub', this.createTableRows([
            'of {numbers}',
            'hi {numbers}',
            'ho {numbers}',
            'nu {numbers}']), true);
        var numSubSub = this.createTable('numbers substitution substitution table', this.createTableRows([
            '{numSub}',
            '{numSub} {numSub}',
            '{numSub} {numSub} {numSub}',
            '{numSub} {numSub} {numSub} {numSub}']), true);
        this.createPlan('numSubSub plan', [this.createTableRoll(numSubSub)]);
        psuedoRandomNums = [0.35, 0.15, 0.15, 0.35, 0.35];
        var a = Linq.from(this.roller.roll('numSubSub plan')).first();
        chai_1.expect(a).to.be.equal('of one hi two');
    };
    TestRoller_RollFunction.prototype.testRollSubstitutionTable_nestedSubstitution_hothree = function () {
        var numbers = this.createTable('numbers', this.createTableRows(['one', 'two', 'three', 'four']));
        var numSub = this.createTable('numSub', this.createTableRows([
            'of {numbers}',
            'hi {numbers}',
            'ho {numbers}',
            'nu {numbers}']), true);
        var numSubSub = this.createTable('numbers substitution substitution table', this.createTableRows([
            '{numSub}',
            '{numSub} {numSub}',
            '{numSub} {numSub} {numSub}',
            '{numSub} {numSub} {numSub} {numSub}']), true);
        this.createPlan('numSubSub plan', [this.createTableRoll(numSubSub)]);
        psuedoRandomNums = [0.65, 0.15, 0.15, 0.35, 0.35, 0.65, 0.65];
        var a = Linq.from(this.roller.roll('numSubSub plan')).first();
        chai_1.expect(a).to.be.equal('of one hi two ho three');
    };
    TestRoller_RollFunction.prototype.testRollSubstitutionTable_nestedSubstitution_nufour = function () {
        var numbers = this.createTable('numbers', this.createTableRows(['one', 'two', 'three', 'four']));
        var numSub = this.createTable('numSub', this.createTableRows([
            'of {numbers}',
            'hi {numbers}',
            'ho {numbers}',
            'nu {numbers}']), true);
        var numSubSub = this.createTable('numbers substitution substitution table', this.createTableRows([
            '{numSub}',
            '{numSub} {numSub}',
            '{numSub} {numSub} {numSub}',
            '{numSub} {numSub} {numSub} {numSub}']), true);
        this.createPlan('numSubSub plan', [this.createTableRoll(numSubSub)]);
        psuedoRandomNums = [0.85, 0.15, 0.15, 0.35, 0.35, 0.65, 0.65, 0.85, 0.85];
        var a = Linq.from(this.roller.roll('numSubSub plan')).first();
        chai_1.expect(a).to.be.equal('of one hi two ho three nu four');
    };
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollNumbersTable_one",
        __decorate([
            mocha_1.test('Roll numbers table: one')
        ], TestRoller_RollFunction.prototype, "testRollNumbersTable_one", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollNumbersTable_one")));
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollNumbersTable_two",
        __decorate([
            mocha_1.test('Roll numbers table: two')
        ], TestRoller_RollFunction.prototype, "testRollNumbersTable_two", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollNumbersTable_two")));
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollNumbersTable_three",
        __decorate([
            mocha_1.test('Roll numbers table: three')
        ], TestRoller_RollFunction.prototype, "testRollNumbersTable_three", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollNumbersTable_three")));
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollNumbersTable_four",
        __decorate([
            mocha_1.test('Roll numbers table: four')
        ], TestRoller_RollFunction.prototype, "testRollNumbersTable_four", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollNumbersTable_four")));
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_one",
        __decorate([
            mocha_1.test('Roll substitution table: two')
        ], TestRoller_RollFunction.prototype, "testRollSubstitutionTable_one", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_one")));
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_onetwo",
        __decorate([
            mocha_1.test('Roll substitution table: onetwo')
        ], TestRoller_RollFunction.prototype, "testRollSubstitutionTable_onetwo", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_onetwo")));
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_onetwothree",
        __decorate([
            mocha_1.test('Roll substitution table: onetwothree')
        ], TestRoller_RollFunction.prototype, "testRollSubstitutionTable_onetwothree", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_onetwothree")));
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_onetwothreefour",
        __decorate([
            mocha_1.test('Roll substitution table: onetwothreefour')
        ], TestRoller_RollFunction.prototype, "testRollSubstitutionTable_onetwothreefour", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_onetwothreefour")));
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_ofone",
        __decorate([
            mocha_1.test('Roll substitution table: of one')
        ], TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_ofone", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_ofone")));
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_hitwo",
        __decorate([
            mocha_1.test('Roll substitution table: of one hi two')
        ], TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_hitwo", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_hitwo")));
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_hothree",
        __decorate([
            mocha_1.test('Roll substitution table: of one hi two ho three')
        ], TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_hothree", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_hothree")));
    Object.defineProperty(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_nufour",
        __decorate([
            mocha_1.test('Roll substitution table: of one hi two ho three nu four')
        ], TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_nufour", Object.getOwnPropertyDescriptor(TestRoller_RollFunction.prototype, "testRollSubstitutionTable_nestedSubstitution_nufour")));
    TestRoller_RollFunction = __decorate([
        mocha_1.suite
    ], TestRoller_RollFunction);
    return TestRoller_RollFunction;
})();
//# sourceMappingURL=roller.roll.test.js.map