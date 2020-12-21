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
var TestRollerWeightedTableRoll = (function () {
    function TestRollerWeightedTableRoll() {
        this.values = ['one', 'two', 'three', 'four'];
        this.weights = [1, 2, 3, 4];
        this.rolls = [0, 0.24, 0.25, 0.5, 0.75, 0.76, 0.99, 1];
    }
    TestRollerWeightedTableRoll.prototype.before = function () {
        var _this = this;
        this.roller = new roller_1.Roller();
        var t = {
            name: 'test table',
            version: 1.0,
            data: Linq
                .range(0, 4)
                .select(function (i) {
                return {
                    value: _this.values[i],
                    weight: _this.weights[i]
                };
            })
                .toArray()
        };
        this.roller.addTable(t);
        this.testTable = t;
    };
    TestRollerWeightedTableRoll.prototype.performWeightedRollTest = function (roll, expected) {
        chai_1.expect(this.roller.weightedTableRoll('test table', roll))
            .to.be.deep.equal(this.testTable.data[expected]);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_0 = function () {
        this.performWeightedRollTest(0, 0);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_09 = function () {
        this.performWeightedRollTest(0.09, 0);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_01 = function () {
        this.performWeightedRollTest(0.1, 0);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_011 = function () {
        this.performWeightedRollTest(0.11, 1);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_29 = function () {
        this.performWeightedRollTest(0.29, 1);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_3 = function () {
        this.performWeightedRollTest(0.3, 1);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_31 = function () {
        this.performWeightedRollTest(0.31, 2);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_59 = function () {
        this.performWeightedRollTest(0.59, 2);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_6 = function () {
        this.performWeightedRollTest(0.6, 2);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_61 = function () {
        this.performWeightedRollTest(0.61, 3);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_99 = function () {
        this.performWeightedRollTest(0.99, 3);
    };
    TestRollerWeightedTableRoll.prototype.testWeightedRoll_roll_1 = function () {
        this.performWeightedRollTest(1, 3);
    };
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_0",
        __decorate([
            mocha_1.test('Test roll = 0')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_0", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_0")));
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_09",
        __decorate([
            mocha_1.test('Test roll = 0.09')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_09", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_09")));
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_01",
        __decorate([
            mocha_1.test('Test roll = 0.1')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_01", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_01")));
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_011",
        __decorate([
            mocha_1.test('Test roll = 0.11')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_011", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_011")));
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_29",
        __decorate([
            mocha_1.test('Test roll = 0.29')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_29", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_29")));
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_3",
        __decorate([
            mocha_1.test('Test roll = 0.3')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_3", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_3")));
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_31",
        __decorate([
            mocha_1.test('Test roll = 0.31')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_31", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_31")));
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_59",
        __decorate([
            mocha_1.test('Test roll = 0.59')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_59", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_59")));
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_6",
        __decorate([
            mocha_1.test('Test roll = 0.6')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_6", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_6")));
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_61",
        __decorate([
            mocha_1.test('Test roll = 0.61')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_61", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_61")));
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_99",
        __decorate([
            mocha_1.test('Test roll = 0.99')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_99", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_99")));
    Object.defineProperty(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_1",
        __decorate([
            mocha_1.test('Test roll = 1')
        ], TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_1", Object.getOwnPropertyDescriptor(TestRollerWeightedTableRoll.prototype, "testWeightedRoll_roll_1")));
    TestRollerWeightedTableRoll = __decorate([
        mocha_1.suite
    ], TestRollerWeightedTableRoll);
    return TestRollerWeightedTableRoll;
})();
//# sourceMappingURL=roller.weightedTableRoll.test.js.map