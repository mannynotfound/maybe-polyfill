var Maybe = require('../maybe');
module.exports = {
  resolved: Maybe.resolve,
  rejected: Maybe.rejected,
  deferred: function() {
    var obj = {};
    var mayb = new Maybe(function(resolve, reject) {
      obj.resolve = resolve;
      obj.reject = reject;
    });
    obj.maybe = mayb;
    return obj;
  }
};
