(function (window) {
  var t = window["t-data"] = {
    data : {
      header : { arrNew : ["person"] },
      side : {},
      user : {
        name : "王霞",
        date : { week: "星期五", year: "2015年", month: "10月", day: "12号" },
        address : {
          name : "上海",
          temperature : 26,
          airQualityCondition : "良好",
          weatherCondition : "good"
        },
        info : {
          receive : 10,
          delegate : 32,
          recommendFeedback : 6,
          feedbackApply : 11,
          buildMatch : 115
        }
      },
      content : {
        selection : {
          memu : {
            jobStates : ['发布中的职位', '已关闭的职位', '已暂缓职位', '已成功职位'],
            industries : [
              {
                name : "房地产",
                items : [
                  {
                    name : "土木/建筑工程",
                    content : [
                      "项目经理",
                      "项目经理aaa",
                      "项目理",
                      "项目",
                      "项a",
                      "aaa",
                      "asasas"
                    ]
                  }
                ]
              }
            ],
            cities : {
              i : ["上海", "北京", "深圳", "上海", "北京", "深圳", "深圳"],
              ii : ["上海", "北京", "深圳", "上海", "北京", "深圳", "深圳"],
              iii : ["上海", "北京", "深圳", "上海", "北京", "深圳", "深圳"]
            },
            customers : [
              {
                industryName : "房地产",
                industryCompanies : [
                  'aaaaa',
                  'bbbbbbbbbbbbbbb',
                  'ccccc',
                  'ddddddddddddd',
                  'eeeeeeeeeeeeeeeeeee'
                ]
              }
            ],
            managers : [
              ["aaa", "bbb", "cccc", "dddddd"],
              ["aaa", "bbb", "cccc", "dddddd"],
              ["aaa", "bbb", "cccc", "dddddd"]
            ]
          }
        },
        crumb : {
          postionData : {
            sum : 80,
            city : "麻花沟村"
          }
        },
        titles : [],
        items : [
          {
            desc : { position: "投资部总监/总经理   翠花", company : "IBM" },
            recommending : [
              { name : "Jack", isNew: true, level: 2 },
              { name : "Jack", isNew: false, level: 4 },
              { name : "Jack", isNew: true, level: 3 },
              { name : "Jack", isNew: false, level: 5 },
              { name : "Jack", isNew: true, level: 3 },
              { name : "Jack", isNew: false, level: 0 },
              { name : "Jack", isNew: true, level: 3 },
              { name : "Jack", isNew: true, level: 1 }
            ],
            matched : [
              { name : "Robert", isNew: true, level: 4 },
              { name : "Robert", isNew: false, level: 1 },
              { name : "Robert", isNew: false, level: 1 },
              { name : "Robert", isNew: false, level: 1 },
              { name : "Robert", isNew: false, level: 1 }
            ],
            update : {
              ymd : "2015/10/30",
              hms : "16:00"
            }
          }
        ],
        pagination : { start : 0, times: 1 }
      }
    }
  };

  var industries = t.data.content.selection.memu.industries;
  var one = industries[0];
  var item = one.items[0];
  one.items.push(item);
  one.items.push(item);
  one.items.push(item);
  industries.push(one);
  industries.push(one);
  industries.push(one);

  var customers = t.data.content.selection.memu.customers;
  var one = customers[0];
  customers.push(one);
  customers.push(one);
  customers.push(one);

  var items = t.data.content.items;
  var one = items[0];
  items.push(one);
  items.push(one);
  items.push(one);
  items.push(one);
  items.push(one);
  items.push(one);
  items.push(one);
  items.push(one);
  items.push(one);
  items.push(one);
  items.push(one);
  items.push(one);

  // ---------------------------------------
  // according to items per page(max) * pages
  t.data.content.pagination.times = 6;

})(window);