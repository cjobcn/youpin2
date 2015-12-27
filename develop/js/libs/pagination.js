define([
  'vue',
  'jquery'
], function (Vue, $) {

  var I_PAGINATION_REMAINING = 8;

  var data = {
    active: false,
    len: 0,
    start: 0,
    cur: 0,
    remaining: I_PAGINATION_REMAINING,
    working: false,
    pass: false
  };

  var srcData = {
    el: '',
    template: '',
    data: function () {
      return $.extend({}, data);
    },
    methods : {
      show: function () {
        this.active = true;
      },
      hide: function () {
        this.active = false;
      },
      /**
       * @desc set the pagination's pages' len
       * @param {Number} len
       * @return void 0
       */
      setLen: function (len) {
        this.$set('len', len);
      },
      onClick : function (e, i) {
        e.preventDefault();

        i = ~~i;

        if (i == this.cur || this.working) {
          return false;
        }

        if (i < 0 ||　i > this.len - 1) {
          this.$emit("exceed", i, i < 0);
          if (!this.pass) {
            return false;
          }
          this.pass = false;
          i = i < 0 ? this.len - 1 : 0;
        }

        this.working = true;

        this.start = i > this.start + this.remaining
          ? i - this.remaining
          : i < this.start
          ? i
          : this.start;

        this.$emit('change', i, this.cur);
        this.cur = i;

        var self = this;
        self.$nextTick(function () {
          self.working = false;
        });
        return false;
      }
    },
    events: {
      "change": function (index) {},
      "exceed": function (index, lower) {}
    }
  };

  var createPagination = function (opts) {
    if (!(opts.selector || opts.template))
      throw new Error('no selector or no template');

    var data = $.extend(true, srcData, opts);
    return opts.template
      ? data
      : new Vue(data);
  };

  createPagination.getData = function (opts) {
    return $.extend({}, data, opts || {});
  };

  return createPagination;
});
