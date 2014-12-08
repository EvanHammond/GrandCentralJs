(function() {
  var GrandCentral, _current, _guid, _interval, _queue, _timerId;
  _guid = (function() {
    var s4;
    s4 = function() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return function() {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };
  })();
  _queue = [];
  _timerId = null;
  _current = 0;
  _interval = 1;
  GrandCentral = function() {
    return this.debug = false;
  };
  GrandCentral.prototype = {
    add: function(o) {
      o._gcGuid = _guid();
      o._gcNext = _current;
      o._gcCount = 0;
      o.gcIterations = o.gcIterations || 0;
      o.gcScope = o.gcScope || o;
      o.gcInterval = o.gcInterval || _interval;
      if (typeof o.gcCallback === 'function') {
        _queue.push(o);
      }
      if (_timerId === null && _queue.length > 0) {
        this.start();
      }
      return o;
    },
    find: function(guid) {
      var i, _i, _len;
      for (_i = 0, _len = _queue.length; _i < _len; _i++) {
        i = _queue[_i];
        if (i._gcGuid === guid) {
          return i;
        }
      }
    },
    remove: function(index) {
      Array.prototype.splice.apply(_queue, [index, 1]);
      if (_queue.length <= 0) {
        this.log('Queue empty');
        this.stop();
      }
      return true;
    },
    start: function() {
      var gc;
      if (_queue.length > 0) {
        this.log('Spool started.');
        gc = this;
        return _timerId = window.setInterval(function() {
          return gc.log(gc._proc());
        }, _interval * 1000);
      } else {
        return this.log('No items in queue. Spool aborted.');
      }
    },
    stop: function() {
      this.log('Spool stopped.');
      window.clearInterval(_timerId);
      _timerId = null;
      return true;
    },
    _proc: function() {
      var i, _i, _len;
      for (_i = 0, _len = _queue.length; _i < _len; _i++) {
        i = _queue[_i];
        if (i._gcNext === _current) {
          if (typeof i.gcCallback === 'function') {
            i.gcCallback.apply(i.gcScope, [i]);
          }
          i._gcNext += +i.gcInterval;
          i._gcCount++;
        }
        if (i.gcIterations > 0 && i._gcCount >= i.gcIterations) {
          this.remove(i);
        }
        _current++;
      }
      return "ping";
    },
    log: function(msg) {
      if (this.debug === true) {
        console.log('Grand Central: ' + msg);
      }
      return true;
    }
  };
  return window.GrandCentral = new GrandCentral();
})();
