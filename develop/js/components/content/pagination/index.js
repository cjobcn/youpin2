define(['vue', 'jquery'], function (Vue, $) {
  var I_PAGINATION_REMAINING = 8;
  return function (selector, remaining) {
    remaining = remaining || I_PAGINATION_REMAINING;
    return new Vue({
      el: selector,
      data: {
        active: false,
        len: 0,
        start: 0,
        cur: 0,
        remaining: remaining,
        working: false,
        pass: false
      },
      methods : {
        show: function () {
          $(this.$el).removeClass('hidden');
          this.active = true;
        },
        hide: function () {
          $(this.$el).addClass('hidden');
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
            this.$emit("exceed-index", i, i < 0);
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

          this.$emit('change-index', i, this.cur);
          this.cur = i;

          var self = this;
          self.$nextTick(function () {
            self.working = false;
          });
          return false;
        }
      },
      events: {
        "change-index": function (index) {},
        "exceed-index": function (index, lower) {}
      }
    });
  };
});
