define(function () {
  // .... set the local storage to keep tracking the data

  var db = {
    data: function () {
      var args = Array.prototype.slice.call(arguments);
      var ret = window.localStorage;

      // *** if null just return all the data from window.localStorage
      if (!args.length)
        return ret;

      var one;
      for (var i = 0, len = args.length; i < len; i++) {
        try {
          if (i === 0) {
            if (typeof args[i] !== 'string') {
              throw new Error('first key is not {String}');
            }
            ret = JSON.parse(window.localStorage.getItem(args[i]));
          } else {
            ret = ret[args[i]];
          }
        } catch (e) {
          ret = null;
          console.warn(e);
          console.warn('there is no data for:');
          console.warn(args);
          break;
        }
      }
      return ret;
    },
    indexInArray: function (i, arr) {
      i = ~~i;
      return i < arr.length && i >= 0;
    },
    navSelections: {
      inited: false,
      init: function () {
        if (this.inited)
          return;
        this.inited = true;

        if (window.localStorage.navSelections == null ||
          !Array.isArray(window.localStorage.navSelections)) {
          // ********
          this.empty();
        } else {
          // ....
        }
      },
      _set: function (arr) {
        window.localStorage.setItem('navSelections',  JSON.stringify(arr));
      },
      add: function (i, val) {
        if (i == null)
          return;
        var arr = this.get();
        if (db.indexInArray(i, arr)) {
          arr[i].push(val);
          this._set(arr);
        }
      },
      remove: function (i, j) {
        if (i == null)
          return;
        var arr = this.get();
        if (db.indexInArray(i, arr) && db.indexInArray(j, arr[i])) {
          arr[i].splice(j, 1);
          this._set(arr);
        }
      },
      get: function (i) {
        return i != null
          ? db.data('navSelections', i)
          : db.data('navSelections');
      },
      set: function (i, list) {
        var arr = this.get();
        if (i == null) {
          arr = [[], []];
        } else if (db.indexInArray(i, arr) && Array.isArray(list)) {
          arr[i] = list;
        }
        this._set(arr);
      },
      empty: function(i) {
        this.set(i, []);
      }
    }
  };

  db.navSelections.init();
  //db.navSelections.empty();

  return db;
});
