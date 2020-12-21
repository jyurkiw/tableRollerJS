var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var store_1 = require('../src/store');
var mocha_1 = require("@testdeck/mocha");
var chai_1 = require('chai');
var NamedNum = (function () {
    function NamedNum(n) {
        this.version = 1;
        this.name = n;
    }
    return NamedNum;
})();
exports.NamedNum = NamedNum;
var firstNum = new NamedNum('first');
var secNum = new NamedNum('second');
var TestStore = (function () {
    function TestStore() {
        this.store = new store_1.Store();
    }
    TestStore.prototype.testAdd = function () {
        this.store.add(firstNum);
        chai_1.expect(this.store.has(firstNum.name)).to.be.true;
    };
    TestStore.prototype.testAddData = function () {
        this.store.addm([firstNum, secNum]);
        chai_1.expect(this.store.size()).to.be.eq(2);
    };
    TestStore.prototype.testAdd_DuplicateFail = function () {
        var _this = this;
        chai_1.expect(function () { return _this.store.addm([firstNum, firstNum]); })
            .to.throw('Duplicate item: ' + firstNum.name);
    };
    TestStore.prototype.testRemoveSuccess = function () {
        this.store.add(firstNum);
        chai_1.expect(this.store.remove(firstNum.name)).to.be.true;
        chai_1.expect(this.store.has(firstNum.name)).to.be.false;
    };
    TestStore.prototype.testRemoveFail = function () {
        chai_1.expect(this.store.remove(firstNum.name)).to.be.false;
    };
    TestStore.prototype.testGetSuccess = function () {
        this.store.add(firstNum);
        chai_1.expect(this.store.get(firstNum.name).name)
            .to.be.eq(firstNum.name);
    };
    TestStore.prototype.testGetFail = function () {
        var _this = this;
        chai_1.expect(function () { return _this.store.get(firstNum.name); })
            .to.throw(firstNum.name + ' does not exist.');
    };
    Object.defineProperty(TestStore.prototype, "testAdd",
        __decorate([
            mocha_1.test('Test the add method')
        ], TestStore.prototype, "testAdd", Object.getOwnPropertyDescriptor(TestStore.prototype, "testAdd")));
    Object.defineProperty(TestStore.prototype, "testAddData",
        __decorate([
            mocha_1.test('Test the addm method')
        ], TestStore.prototype, "testAddData", Object.getOwnPropertyDescriptor(TestStore.prototype, "testAddData")));
    Object.defineProperty(TestStore.prototype, "testAdd_DuplicateFail",
        __decorate([
            mocha_1.test('Test duplicate table error')
        ], TestStore.prototype, "testAdd_DuplicateFail", Object.getOwnPropertyDescriptor(TestStore.prototype, "testAdd_DuplicateFail")));
    Object.defineProperty(TestStore.prototype, "testRemoveSuccess",
        __decorate([
            mocha_1.test('Test remove table')
        ], TestStore.prototype, "testRemoveSuccess", Object.getOwnPropertyDescriptor(TestStore.prototype, "testRemoveSuccess")));
    Object.defineProperty(TestStore.prototype, "testRemoveFail",
        __decorate([
            mocha_1.test('Test remove non-existant table')
        ], TestStore.prototype, "testRemoveFail", Object.getOwnPropertyDescriptor(TestStore.prototype, "testRemoveFail")));
    Object.defineProperty(TestStore.prototype, "testGetSuccess",
        __decorate([
            mocha_1.test('Test get existing table')
        ], TestStore.prototype, "testGetSuccess", Object.getOwnPropertyDescriptor(TestStore.prototype, "testGetSuccess")));
    Object.defineProperty(TestStore.prototype, "testGetFail",
        __decorate([
            mocha_1.test('Test get non-existing table')
        ], TestStore.prototype, "testGetFail", Object.getOwnPropertyDescriptor(TestStore.prototype, "testGetFail")));
    TestStore = __decorate([
        mocha_1.suite
    ], TestStore);
    return TestStore;
})();
//# sourceMappingURL=store.test.js.map