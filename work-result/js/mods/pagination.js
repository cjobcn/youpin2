define(['vue', 'jquery'], function (Vue, $) {
  var maxNext = 8;
  var start = 1;
  var sum = 100;
  function getNextAll(start, sum) {
    var nextAll = sum - start;
    if (nextAll <= 0)
      nextAll = 0;
    else if (nextAll > maxNext)
      nextAll = maxNext;
    return nextAll;
  }
  var pagination = new Vue({
    el: '#pagination',
    data: {
      begin: start,
      sum: sum,
      max: maxNext + 1,
      maxNext: maxNext,
      nextAll: getNextAll(start, sum),
      start: start,
      cur : start,
      end: start + getNextAll(start, sum)
    },
    methods : {
      getNextAll : getNextAll,
      onClickLast : function (e) {
        this.cur = this.sum;
        this.start = this.sum - this.maxNext < 1
          ? 1
          : this.sum - this.maxNext;
        e.preventDefault();
        return false;
      },
      onClickNext : function (e) {
        e.preventDefault();

        var next = this.cur + 1;
        if (next >= this.sum)
          this.cur = this.sum;
        else {
          this.cur++;
          this.start++;
        }

        return false;
      },
      onClickRandom : function (e, index) {
        this.cur = this.start + index;
        e.preventDefault();
        return false;
      },
      onClickStart : function (e) {
        this.start = this.begin;
        this.cur = this.start;
        e.preventDefault();
        return false;
      }
    }
  });
  return pagination;
});
