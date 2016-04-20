var Maybe = require('../maybe');
var sinon = require('sinon');
var assert = require('assert');
var adapter = require('./adapter');
describe("Maybes/A+ Tests", function () {
  require("promises-aplus-tests").mocha(adapter);
});
describe('Maybe', function () {
  describe('Maybe._setImmediateFn', function () {
    it('changes immediate fn', function () {
      var spy = sinon.spy();

      function immediateFn(fn) {
        spy();
        fn();
      };
      Maybe._setImmediateFn(immediateFn);
      var done = false;
      new Maybe(function (resolve) {
        resolve();
      }).then(function () {
        done = true;
      });
      assert(spy.calledOnce);
      assert(done);
    });
    it('changes immediate fn multiple', function () {
      var spy1 = sinon.spy();

      function immediateFn1(fn) {
        spy1();
        fn();
      }

      var spy2 = sinon.spy();

      function immediateFn2(fn) {
        spy2();
        fn();
      }

      Maybe._setImmediateFn(immediateFn1);
      var done = false;
      new Maybe(function (resolve) {
        resolve();
      }).then(function () {
      });
      Maybe._setImmediateFn(immediateFn2);
      new Maybe(function (resolve) {
        resolve();
      }).then(function () {
        done = true;
      });
      assert(spy2.called);
      assert(spy1.calledOnce);
      assert(done);
    });
  });
  describe('Maybe._onUnhandledRejection', function () {
    var stub, sandbox;
    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      stub = sandbox.stub(console, 'warn');
    });
    afterEach(function() {
      sandbox.restore();
    });
    it('no error on resolve', function (done) {
      Maybe.resolve(true).then(function(result) {
        return result;
      }).then(function(result) {
        return result;
      });

      setTimeout(function() {
        assert(!stub.called);
        done();
      }, 200);
    });
    it('error single Maybe', function (done) {
      new Maybe(function(resolve, reject) {
        abc.abc = 1;
      });
      setTimeout(function() {
        assert(stub.calledOnce);
        done();
      }, 200);
    });
    it('multi maybe error', function (done) {
      new Maybe(function(resolve, reject) {
        abc.abc = 1;
      }).then(function(result) {
        return result;
      });
      setTimeout(function() {
        assert(stub.calledOnce);
        done();
      }, 200);
    });
    it('maybe catch no error', function (done) {
      new Maybe(function(resolve, reject) {
        abc.abc = 1;
      }).catch(function(result) {
        return result;
      });
      setTimeout(function() {
        assert(!stub.called);
        done();
      }, 200);
    });
    it('maybe catch no error', function (done) {
      new Maybe(function(resolve, reject) {
        abc.abc = 1;
      }).then(function(result) {
        return result;
      }).catch(function(result) {
        return result;
      });
      setTimeout(function() {
        assert(!stub.called);
        done();
      }, 200);
    });
    it('maybe reject error', function (done) {
      Maybe.reject('hello');
      setTimeout(function() {
        assert(stub.calledOnce);
        done();
      }, 200);
    });
    it('maybe reject error late', function (done) {
      var mayb = Maybe.reject('hello');
      mayb.catch(function() {

      });
      setTimeout(function() {
        assert(!stub.called);
        done();
      }, 200);
    });
    it('maybe reject error late', function (done) {
      Maybe.reject('hello');
      setTimeout(function() {
        assert.equal(stub.args[0][1], 'hello');
        done();
      }, 200);
    });
  });
}); 
