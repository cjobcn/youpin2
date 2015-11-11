;
(function (global, factory) {
  if (typeof module !== "undefined" && module.exports !== void 0) {
    var jade = require("jade-runtime");
    module.exports = factory(jade);
  } else if (typeof define === "function" && define.amd) {
    define("yp-template", ["jade"], factory);
  } else if (global.window === global) {
    global.ypTemplate = factory(global.jade);
  }
})(this, function (jade) {
  var __exports = {};
  __exports.header = function template(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;;
    var locals_for_with = (locals || {});
    (function (data) {
      jade_mixins["show-site-header-menu"] = function (arrNew) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div id=\"site-header-menu\" class=\"fr\"><ul class=\"site-header-link-menu\"><li>");
        if (arrNew && ~arrNew.indexOf('person')) {
          buf.push("<i class=\"img img-info-new\"></i>");
        }
        buf.push("<a href=\"#\" class=\"img img-header-menu img-hm-person\"></a></li><li>");
        if (arrNew && ~arrNew.indexOf('info')) {
          buf.push("<i class=\"img img-info-new\"></i>");
        }
        buf.push("<a href=\"#\" class=\"img img-header-menu img-hm-info\"></a></li><li>");
        if (arrNew && ~arrNew.indexOf('mail')) {
          buf.push("<i class=\"img img-info-new\"></i>");
        }
        buf.push("<a href=\"#\" class=\"img img-header-menu img-hm-mail\"></a></li><li>");
        if (arrNew && ~arrNew.indexOf('switch')) {
          buf.push("<i class=\"img img-info-new\"></i>");
        }
        buf.push("<a href=\"#\" class=\"img img-header-menu img-hm-switch\"></a></li></ul></div>");
      };
      jade_mixins["show-site-logo"] = function () {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div id=\"site-logo\" class=\"fl\"><a href=\"#\" class=\"img img-logo\"></a></div>");
      };
      jade_mixins["show-header"] = function (arrNew) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div class=\"header-container\"><div class=\"clearfix\">");
        jade_mixins["show-site-logo"]();
        jade_mixins["show-site-header-menu"](arrNew);
        buf.push("</div></div>");
      };
      if (data) {
        jade_mixins["show-header"](data.header.arrNew);
      }
    }.call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined));;
    return buf.join("");
  };
  __exports["home-info-content"] = function template(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;;
    var locals_for_with = (locals || {});
    (function (data) {
      var I_MAX_TALENT_LEVELS = 5;
      var I_MAX_TALENT_RECOMMENDING = 6;
      var I_MAX_TALENT_READY_DOWNLOAD = 4;
      var I_MAX_TALENT_MATCHED = 4;
      jade_mixins["info-content-items"] = function (aitems) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        // iterate aitems
        ;
        (function () {
          var $$obj = aitems;
          if ('number' == typeof $$obj.length) {

            for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
              var val = $$obj[$index];

              jade_mixins["info-item"](val);
            }

          } else {
            var $$l = 0;
            for (var $index in $$obj) {
              $$l++;
              var val = $$obj[$index];

              jade_mixins["info-item"](val);
            }

          }
        }).call(this);

      };
      jade_mixins["info-item"] = function (oitem) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div class=\"info-item clearfix\"><div class=\"info-col-t\"><input type=\"checkbox\"/></div><div class=\"info-col-a\">");
        jade_mixins["info-desc"](oitem.desc.position, oitem.desc.company);
        buf.push("</div><div class=\"info-col-b\"><div class=\"info-talent-recommending clearfix\"><ul class=\"info-talent-list\">");
        // iterate oitem.recommending
        ;
        (function () {
          var $$obj = oitem.recommending;
          if ('number' == typeof $$obj.length) {

            for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
              var val = $$obj[index];

              if (index < I_MAX_TALENT_RECOMMENDING) {
                jade_mixins["info-talent-person"](val.name, val.isNew, val.level);
              }
            }

          } else {
            var $$l = 0;
            for (var index in $$obj) {
              $$l++;
              var val = $$obj[index];

              if (index < I_MAX_TALENT_RECOMMENDING) {
                jade_mixins["info-talent-person"](val.name, val.isNew, val.level);
              }
            }

          }
        }).call(this);

        buf.push("</ul><a href=\"#\" class=\"talent-btn img img-arrow-right\"></a></div></div><div class=\"info-col-c\"><div class=\"info-talent-matched clearfix\"><ul class=\"info-talent-list\">");
        // iterate oitem.matched
        ;
        (function () {
          var $$obj = oitem.matched;
          if ('number' == typeof $$obj.length) {

            for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
              var val = $$obj[index];

              if (index < I_MAX_TALENT_MATCHED) {
                jade_mixins["info-talent-person"](val.name, val.isNew, val.level);
              }
            }

          } else {
            var $$l = 0;
            for (var index in $$obj) {
              $$l++;
              var val = $$obj[index];

              if (index < I_MAX_TALENT_MATCHED) {
                jade_mixins["info-talent-person"](val.name, val.isNew, val.level);
              }
            }

          }
        }).call(this);

        buf.push("</ul></div></div><div class=\"info-col-d\"><div class=\"info-talent-update clearfix\"><h5>" + (jade.escape((jade_interp = oitem.update.ymd) == null ? '' : jade_interp)) + "</h5><h5>" + (jade.escape((jade_interp = oitem.update.hms) == null ? '' : jade_interp)) + "</h5></div></div><div class=\"info-col-e\"><p><a href=\"#\" class=\"img-item-4 img-item-record\"></a><a href=\"#\" class=\"img-item-4 img-item-note\"></a><a href=\"#\" class=\"img-item-4 img-item-heart\"></a><a href=\"#\" class=\"img-item-4 img-item-trash\"></a></p></div></div>");
      };
      jade_mixins["info-desc"] = function (position, company) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div class=\"info-desc\">");
        if (position) {
          buf.push("<h2 class=\"info-position\"> " + (jade.escape((jade_interp = position) == null ? '' : jade_interp)) + "</h2>");
        }
        if (company) {
          buf.push("<h3 class=\"info-company\">" + (jade.escape((jade_interp = company) == null ? '' : jade_interp)) + "</h3>");
        }
        buf.push("<a href=\"#\" class=\"talent-btn img img-arrow-right\"></a></div>");
      };
      jade_mixins["info-talent-person"] = function (name, isNew, level) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        var icommon = I_MAX_TALENT_LEVELS - level;
        buf.push("<li class=\"info-talent-person\"><p class=\"talent-desc\"><a href=\"#\" class=\"talen-name\">" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "</a>");
        if (isNew) {
          buf.push("<i class=\"img img-info-new\"></i>");
        }
        buf.push("</p><p class=\"talent-level\">");
        if (level > 0) {
          if (level > I_MAX_TALENT_LEVELS) {
            level = I_MAX_TALENT_LEVELS
          }
          while (level-- !== 0) {
            buf.push("<i class=\"img img-talent img-talent-level-active\"></i>");
          }
        }
        if (icommon > 0) {
          if (icommon > I_MAX_TALENT_LEVELS) {
            icommon = I_MAX_TALENT_LEVELS
          }
          while (icommon-- !== 0) {
            buf.push("<i class=\"img img-talent img-talent-level\"></i>");
          }
        }
        buf.push("</p></li>");
      };
      if (data) {
        jade_mixins["info-content-items"](data.content.items);
      }
    }.call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined));;
    return buf.join("");
  };
  __exports["home-info-title"] = function template(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;;
    var locals_for_with = (locals || {});
    (function (data) {
      jade_mixins["home-info-titles"] = function () {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div class=\"clearfix\"><div class=\"info-col-t\"></div><div class=\"info-col-a\"><h2>职位</h2></div><div class=\"info-col-b\"><h2>推荐中人才</h2></div><div class=\"info-col-c\"><h2>匹配人才</h2></div><div class=\"info-col-d\"><h2>更新时间</h2></div><div class=\"info-col-e\"></div></div>");
      };
      if (data) {
        jade_mixins["home-info-titles"]();
      }
    }.call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined));;
    return buf.join("");
  };
  __exports["info-crumb"] = function template(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;;
    var locals_for_with = (locals || {});
    (function (data) {
      jade_mixins["info-crumb"] = function (postionData) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<p><a href=\"#\" class=\"info-all-positions\">所有职位</a><i class=\"img img-arrow-right\"></i><a href=\"#\" class=\"info-current-city\"><span>" + (jade.escape((jade_interp = postionData.city) == null ? '' : jade_interp)) + "</span><i class=\"img img-delete\"></i></a><i class=\"img img-arrow-right\"></i><a href=\"#\" class=\"info-sum-positions\">共<span>" + (jade.escape((jade_interp = postionData.sum) == null ? '' : jade_interp)) + "</span>个职位</a></p>");
      };
      if (data) {
        jade_mixins["info-crumb"](data.content.crumb.postionData);
      }
    }.call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined));;
    return buf.join("");
  };
  __exports.pagination = function template(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;;
    var locals_for_with = (locals || {});
    (function (data) {
      jade_mixins["make-pagination"] = function (start, times) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        if (!start || start < 1) {
          start = 1;
        }
        if (!times || times < 1) {
          times = 1;
        }
        var end = start + times - 1;
        var i = 1;
        if (times >= 5) {
          times = 5;
        }
        buf.push("<div id=\"pagination\"><p>");
        if (times <= 1 || start <= 1) {
          buf.push("<a href=\"#\" class=\"pagination-btn-prev pagination-no-use\">|<</a><a href=\"#\" class=\"pagination-btn-prev pagination-no-use\">上一页</a>");
        } else {
          buf.push("<a class=\"pagination-btn-prev\">|<</a><a class=\"pagination-btn-prev\">上一页</a>");
        }
        buf.push("<a href=\"#\" class=\"pagination-num pagination-active\">" + (jade.escape((jade_interp = start) == null ? '' : jade_interp)) + "</a>");
        if (times > 1) {
          while (i < times) {
            buf.push("<a href=\"#\" class=\"pagination-num\">" + (jade.escape((jade_interp = start + i) == null ? '' : jade_interp)) + "</a>");
            i++
          }
        }
        buf.push("<span class=\"pagination-ellipsis\">...</span><a href=\"#\" class=\"pagination-btn-next\">下一页</a><a href=\"#\" class=\"pagination-btn-next\">>|</a><span class=\"pagination-empty\"></span><span class=\"pagination-jump-to\">跳转到</span><input type=\"text\" value=\"\" class=\"pagination-custom-num\"/><span class=\"pagination-jump-to\">页</span><a href=\"#\" class=\"pagination-btn-enter\">确定</a><span class=\"pagination-hidden-sum\">" + (jade.escape((jade_interp = end) == null ? '' : jade_interp)) + "</span></p></div>");
      };
      if (data) {
        jade_mixins["make-pagination"](data.content.pagination.start, data.content.pagination.times);
      }
    }.call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined));;
    return buf.join("");
  };
  __exports["selection-menu"] = function template(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;;
    var locals_for_with = (locals || {});
    (function (data) {
      var I_MAX_INDUSTRY_ITEM = 4;
      jade_mixins["selection-job-states"] = function (arrNames) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<ul class=\"selection-job-btns\">");
        // iterate arrNames
        ;
        (function () {
          var $$obj = arrNames;
          if ('number' == typeof $$obj.length) {

            for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
              var val = $$obj[$index];

              buf.push("<li><a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a></li>");
            }

          } else {
            var $$l = 0;
            for (var $index in $$obj) {
              $$l++;
              var val = $$obj[$index];

              buf.push("<li><a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a></li>");
            }

          }
        }).call(this);

        buf.push("</ul>");
      };
      jade_mixins["selection-industries"] = function (aindustries) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        // iterate aindustries
        ;
        (function () {
          var $$obj = aindustries;
          if ('number' == typeof $$obj.length) {

            for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
              var industry = $$obj[$index];

              buf.push("<div class=\"selection-industry\"><a class=\"selection-industry-name\">" + (jade.escape((jade_interp = industry.name) == null ? '' : jade_interp)) + "</a><ul class=\"selection-industry-list clearfix\">");
              // iterate industry.items
              ;
              (function () {
                var $$obj = industry.items;
                if ('number' == typeof $$obj.length) {

                  for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
                    var item = $$obj[index];

                    if (index < I_MAX_INDUSTRY_ITEM) {
                      buf.push("<li><a class=\"selection-industry-item-name\">" + (jade.escape((jade_interp = item.name) == null ? '' : jade_interp)) + "</a><p class=\"selection-industry-item-content\">");
                      // iterate item.content
                      ;
                      (function () {
                        var $$obj = item.content;
                        if ('number' == typeof $$obj.length) {

                          for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                            var val = $$obj[$index];

                            buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
                          }

                        } else {
                          var $$l = 0;
                          for (var $index in $$obj) {
                            $$l++;
                            var val = $$obj[$index];

                            buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
                          }

                        }
                      }).call(this);

                      buf.push("</p></li>");
                    }
                  }

                } else {
                  var $$l = 0;
                  for (var index in $$obj) {
                    $$l++;
                    var item = $$obj[index];

                    if (index < I_MAX_INDUSTRY_ITEM) {
                      buf.push("<li><a class=\"selection-industry-item-name\">" + (jade.escape((jade_interp = item.name) == null ? '' : jade_interp)) + "</a><p class=\"selection-industry-item-content\">");
                      // iterate item.content
                      ;
                      (function () {
                        var $$obj = item.content;
                        if ('number' == typeof $$obj.length) {

                          for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                            var val = $$obj[$index];

                            buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
                          }

                        } else {
                          var $$l = 0;
                          for (var $index in $$obj) {
                            $$l++;
                            var val = $$obj[$index];

                            buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
                          }

                        }
                      }).call(this);

                      buf.push("</p></li>");
                    }
                  }

                }
              }).call(this);

              buf.push("</ul></div>");
            }

          } else {
            var $$l = 0;
            for (var $index in $$obj) {
              $$l++;
              var industry = $$obj[$index];

              buf.push("<div class=\"selection-industry\"><a class=\"selection-industry-name\">" + (jade.escape((jade_interp = industry.name) == null ? '' : jade_interp)) + "</a><ul class=\"selection-industry-list clearfix\">");
              // iterate industry.items
              ;
              (function () {
                var $$obj = industry.items;
                if ('number' == typeof $$obj.length) {

                  for (var index = 0, $$l = $$obj.length; index < $$l; index++) {
                    var item = $$obj[index];

                    if (index < I_MAX_INDUSTRY_ITEM) {
                      buf.push("<li><a class=\"selection-industry-item-name\">" + (jade.escape((jade_interp = item.name) == null ? '' : jade_interp)) + "</a><p class=\"selection-industry-item-content\">");
                      // iterate item.content
                      ;
                      (function () {
                        var $$obj = item.content;
                        if ('number' == typeof $$obj.length) {

                          for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                            var val = $$obj[$index];

                            buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
                          }

                        } else {
                          var $$l = 0;
                          for (var $index in $$obj) {
                            $$l++;
                            var val = $$obj[$index];

                            buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
                          }

                        }
                      }).call(this);

                      buf.push("</p></li>");
                    }
                  }

                } else {
                  var $$l = 0;
                  for (var index in $$obj) {
                    $$l++;
                    var item = $$obj[index];

                    if (index < I_MAX_INDUSTRY_ITEM) {
                      buf.push("<li><a class=\"selection-industry-item-name\">" + (jade.escape((jade_interp = item.name) == null ? '' : jade_interp)) + "</a><p class=\"selection-industry-item-content\">");
                      // iterate item.content
                      ;
                      (function () {
                        var $$obj = item.content;
                        if ('number' == typeof $$obj.length) {

                          for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                            var val = $$obj[$index];

                            buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
                          }

                        } else {
                          var $$l = 0;
                          for (var $index in $$obj) {
                            $$l++;
                            var val = $$obj[$index];

                            buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
                          }

                        }
                      }).call(this);

                      buf.push("</p></li>");
                    }
                  }

                }
              }).call(this);

              buf.push("</ul></div>");
            }

          }
        }).call(this);

      };
      jade_mixins["selection-cities"] = function (cities) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<p class=\"selection-city-i\"><a href=\"#\" class=\"active\">全国</a>");
        // iterate cities.i
        ;
        (function () {
          var $$obj = cities.i;
          if ('number' == typeof $$obj.length) {

            for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
              var val = $$obj[$index];

              buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
            }

          } else {
            var $$l = 0;
            for (var $index in $$obj) {
              $$l++;
              var val = $$obj[$index];

              buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
            }

          }
        }).call(this);

        buf.push("</p><p class=\"selection-city-ii\">");
        // iterate cities.ii
        ;
        (function () {
          var $$obj = cities.ii;
          if ('number' == typeof $$obj.length) {

            for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
              var val = $$obj[$index];

              buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
            }

          } else {
            var $$l = 0;
            for (var $index in $$obj) {
              $$l++;
              var val = $$obj[$index];

              buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
            }

          }
        }).call(this);

        buf.push("</p><p class=\"selection-city-iii\">");
        // iterate cities.iii
        ;
        (function () {
          var $$obj = cities.iii;
          if ('number' == typeof $$obj.length) {

            for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
              var val = $$obj[$index];

              buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
            }

          } else {
            var $$l = 0;
            for (var $index in $$obj) {
              $$l++;
              var val = $$obj[$index];

              buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val) == null ? '' : jade_interp)) + "</a>");
            }

          }
        }).call(this);

        buf.push("</p>");
      };
      jade_mixins["selection-customers"] = function (customers) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<ul>");
        // iterate customers
        ;
        (function () {
          var $$obj = customers;
          if ('number' == typeof $$obj.length) {

            for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
              var val = $$obj[$index];

              buf.push("<li><a class=\"selection-customer-name\">" + (jade.escape((jade_interp = val.industryName) == null ? '' : jade_interp)) + "</a><div class=\"selection-customer-content\">");
              // iterate val.industryCompanies
              ;
              (function () {
                var $$obj = val.industryCompanies;
                if ('number' == typeof $$obj.length) {

                  for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                    var val2 = $$obj[$index];

                    buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val2) == null ? '' : jade_interp)) + "</a>");
                  }

                } else {
                  var $$l = 0;
                  for (var $index in $$obj) {
                    $$l++;
                    var val2 = $$obj[$index];

                    buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val2) == null ? '' : jade_interp)) + "</a>");
                  }

                }
              }).call(this);

              buf.push("</div></li>");
            }

          } else {
            var $$l = 0;
            for (var $index in $$obj) {
              $$l++;
              var val = $$obj[$index];

              buf.push("<li><a class=\"selection-customer-name\">" + (jade.escape((jade_interp = val.industryName) == null ? '' : jade_interp)) + "</a><div class=\"selection-customer-content\">");
              // iterate val.industryCompanies
              ;
              (function () {
                var $$obj = val.industryCompanies;
                if ('number' == typeof $$obj.length) {

                  for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                    var val2 = $$obj[$index];

                    buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val2) == null ? '' : jade_interp)) + "</a>");
                  }

                } else {
                  var $$l = 0;
                  for (var $index in $$obj) {
                    $$l++;
                    var val2 = $$obj[$index];

                    buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val2) == null ? '' : jade_interp)) + "</a>");
                  }

                }
              }).call(this);

              buf.push("</div></li>");
            }

          }
        }).call(this);

        buf.push("</ul>");
      };
      jade_mixins["selection-managers"] = function (managers) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<ul>");
        // iterate managers
        ;
        (function () {
          var $$obj = managers;
          if ('number' == typeof $$obj.length) {

            for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
              var val = $$obj[$index];

              buf.push("<li>");
              // iterate val
              ;
              (function () {
                var $$obj = val;
                if ('number' == typeof $$obj.length) {

                  for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                    var val2 = $$obj[$index];

                    buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val2) == null ? '' : jade_interp)) + "</a>");
                  }

                } else {
                  var $$l = 0;
                  for (var $index in $$obj) {
                    $$l++;
                    var val2 = $$obj[$index];

                    buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val2) == null ? '' : jade_interp)) + "</a>");
                  }

                }
              }).call(this);

              buf.push("</li>");
            }

          } else {
            var $$l = 0;
            for (var $index in $$obj) {
              $$l++;
              var val = $$obj[$index];

              buf.push("<li>");
              // iterate val
              ;
              (function () {
                var $$obj = val;
                if ('number' == typeof $$obj.length) {

                  for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                    var val2 = $$obj[$index];

                    buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val2) == null ? '' : jade_interp)) + "</a>");
                  }

                } else {
                  var $$l = 0;
                  for (var $index in $$obj) {
                    $$l++;
                    var val2 = $$obj[$index];

                    buf.push("<a href=\"#\">" + (jade.escape((jade_interp = val2) == null ? '' : jade_interp)) + "</a>");
                  }

                }
              }).call(this);

              buf.push("</li>");
            }

          }
        }).call(this);

        buf.push("</ul>");
      };
      jade_mixins["selection-memu"] = function (data) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div class=\"selection-nav-list clearfix\"><a href=\"#\" index=\"0\" class=\"selection-nav selction-nav-job-state\"><i class=\"img img-selction img-job-state\"></i><span>职位状态</span><div class=\"selection-mask\"></div></a><a href=\"#\" index=\"1\" class=\"selection-nav selction-nav-industry-function\"><i class=\"img img-selction img-industry-function\"></i><span>行业职能</span><div class=\"selection-mask\"></div></a><a href=\"#\" index=\"2\" class=\"selection-nav selction-nav-cities\"><i class=\"img img-selction img-cities\"></i><span>城市</span><div class=\"selection-mask\"></div></a><a href=\"#\" index=\"3\" class=\"selection-nav selction-nav-customer\"><i class=\"img img-selction img-customer\"></i><span>客户</span><div class=\"selection-mask\"></div></a><a href=\"#\" index=\"4\" class=\"selection-nav selction-nav-customer-manager\"><i class=\"img img-selction img-customer-manager\"></i><span> 客户经理</span><div class=\"selection-mask\"></div></a></div><div class=\"selection-content-list\"><div index=\"0\" class=\"selection-content selection-content-job-states\">");
        jade_mixins["selection-job-states"](data.jobStates);
        buf.push("</div><div index=\"1\" class=\"selection-content selection-content-industries-function\">");
        jade_mixins["selection-industries"](data.industries);
        buf.push("</div><div index=\"2\" class=\"selection-content selection-content-cities\">");
        jade_mixins["selection-cities"](data.cities);
        buf.push("</div><div index=\"3\" class=\"selection-content selection-content-customers\">");
        jade_mixins["selection-customers"](data.customers);
        buf.push("</div><div index=\"4\" class=\"selection-content selection-content-managers\">");
        jade_mixins["selection-managers"](data.managers);
        buf.push("</div></div><div id=\"selection-menu-search\"><input type=\"text\"/><a href=\"#\" class=\"img img-magnify\"></a></div>");
      };
      if (data) {
        jade_mixins["selection-memu"](data.content.selection.memu);
      }
    }.call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined));;
    return buf.join("");
  };
  __exports.side = function template(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;;
    var locals_for_with = (locals || {});
    (function (data) {
      jade_mixins["side"] = function () {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div class=\"tab-v\"><ul class=\"tab-v-nav\"><li><a href=\"#\" class=\"img img-side img-home\"></a></li><li><a href=\"#\" class=\"img img-side img-member\"></a></li><li><a href=\"#\" class=\"img img-side img-briefcase\"></a></li><li><a href=\"#\" class=\"img img-side img-handon\"></a></li><li><a href=\"#\" class=\"img img-side img-books\"></a></li></ul></div>");
      };
      if (data) {
        jade_mixins["side"]();
      }
    }.call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined));;
    return buf.join("");
  };
  __exports.user = function template(locals) {
    var buf = [];
    var jade_mixins = {};
    var jade_interp;;
    var locals_for_with = (locals || {});
    (function (data) {
      jade_mixins["show-user"] = function (ouser) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        jade_mixins["show-user-base"](ouser);
        jade_mixins["show-user-info"](ouser.info);
        jade_mixins["show-user-function"]();
      };
      jade_mixins["show-user-base"] = function (ouser) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div id=\"user-base\">");
        jade_mixins["say-hello-to-user"](ouser.name);
        jade_mixins["show-date-for-user"](ouser.date);
        jade_mixins["show-address-for-user"](ouser.address);
        buf.push("</div>");
      };
      jade_mixins["say-hello-to-user"] = function (name) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div class=\"user-hello\"><h2><span class=\"username\">" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "</span>&nbsp;, 早上好</h2></div>");
      };
      jade_mixins["show-date-for-user"] = function (odate) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<p id=\"date\"><i class=\"date-week\">" + (jade.escape((jade_interp = odate.week) == null ? '' : jade_interp)) + "</i><i class=\"date-year\">" + (jade.escape((jade_interp = odate.year) == null ? '' : jade_interp)) + "</i><i class=\"date-month\">" + (jade.escape((jade_interp = odate.month) == null ? '' : jade_interp)) + "</i><i class=\"date-day\">" + (jade.escape((jade_interp = odate.day) == null ? '' : jade_interp)) + "</i></p>");
      };
      jade_mixins["show-address-for-user"] = function (oaddress) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        var weatherConditionImage = "weather-condition-image";
        buf.push("<p class=\"weather-info\"><i id=\"user-city\">" + (jade.escape((jade_interp = oaddress.name) == null ? '' : jade_interp)) + "</i><i id=\"temperature\"> " + (jade.escape((jade_interp = oaddress.temperature) == null ? '' : jade_interp)) + "</i><i class=\"weather-du\">o</i><i>C</i></p><p class=\"weather-quality\"><i>空气质量:</i><i id=\"weather-quality-condition\"> " + (jade.escape((jade_interp = oaddress.airQualityCondition) == null ? '' : jade_interp)) + "</i>");
        jade_mixins["show-weather-condition"](oaddress.weatherCondition);
        buf.push("</p>");
      };
      jade_mixins["show-weather-condition"] = function (weatherCondition) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        if (weatherCondition) {
          switch (weatherCondition) {
          case "perfect":
            buf.push("<a class=\"img img-weather weather-condition-image\"></a>");
            break;
          case "good":
            buf.push("<a class=\"img img-weather weather-condition-image\"></a>");
            break;
          case "rain":
            buf.push("<a class=\"img img-weather weather-condition-image\"></a>");
            break;
          case "cloudy":
            buf.push("<a class=\"img img-weather weather-condition-image\"></a>");
            break;
          case "very big rain":
            buf.push("<a class=\"img img-weather weather-condition-image\"></a>");
            break;
          case "big rain":
            buf.push("<a class=\"img img-weather weather-condition-image\"></a>");
            break;
          case "middle rain":
            buf.push("<a class=\"img img-weather weather-condition-image\"></a>");
            break;
          case "small rain":
            buf.push("<a class=\"img img-weather weather-condition-image\"></a>");
            break;
          case "very small rain":
            buf.push("<a class=\"img img-weather weather-condition-image\"></a>");
            break;
          default:
            buf.push("<a class=\"img img-weather weather-condition-image\"></a>");
            break;
          }
        }
      };
      jade_mixins["show-user-info"] = function (info) {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div id=\"user-info\"><p><span><a id=\"user-info-num-receive-cvs\" href=\"#\" class=\"user-info-num\">" + (jade.escape((jade_interp = info.receive) == null ? '' : jade_interp)) + "</a></span><a href=\"#\">收到简历</a></p><p><span><a id=\"user-info-num-delegate-position\" href=\"#\" class=\"user-info-num\">" + (jade.escape((jade_interp = info.delegate) == null ? '' : jade_interp)) + "</a></span><a href=\"#\">委托职位</a></p><p><span><a id=\"user-info-num-recommend-feedback\" href=\"#\" class=\"user-info-num\">" + (jade.escape((jade_interp = info.recommendFeedback) == null ? '' : jade_interp)) + "</a></span><a href=\"#\">推荐反馈</a></p><p><span><a id=\"user-info-num-feedback-apply\" href=\"#\" class=\"user-info-num\">" + (jade.escape((jade_interp = info.feedbackApply) == null ? '' : jade_interp)) + "</a></span><a href=\"#\">反馈申请</a></p><p><span><a id=\"user-info-num-build-match\" href=\"#\" class=\"user-info-num\">" + (jade.escape((jade_interp = info.buildMatch) == null ? '' : jade_interp)) + "</a></span><a href=\"#\">建立匹配</a></p></div>");
      };
      jade_mixins["show-user-function"] = function () {
        var block = (this && this.block),
          attributes = (this && this.attributes) || {};
        buf.push("<div id=\"user-function\"><div class=\"user-publish-postion\"><a href=\"#\" class=\"img img-publish-position\"></a></div><div class=\"user-deledate-postion\"><a href=\"#\" class=\"img img-delegate-position\"></a></div></div>");
      };
      if (data) {
        jade_mixins["show-user"](data.user);
      }
    }.call(this, "data" in locals_for_with ? locals_for_with.data : typeof data !== "undefined" ? data : undefined));;
    return buf.join("");
  };;
  return __exports;
});