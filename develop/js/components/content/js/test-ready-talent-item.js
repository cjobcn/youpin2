define(['jquery'], function ($) {
  var I_HIDDEN_AT_FIRST = 4;

  var __testReadyTalentData = {
    status: 0,
    name: 'aaa',
    isNew : false,
    level: 3,
    active: false
  };

  var __testReadyTalentItem = {
    desc : { position: '系统化策略投资经理/策略师',  company: '来自复星凯雷投资的管理团队' },
    customManager: { name: '王思聪' },
    recommending: [],
    readyRecommending: []
  };
  __testReadyTalentItem.recommending.active = false;

  var i = -1;
  var len = 8;
  while (++i < 8) {
    // people whoes index < 4(default) should be hidden at first
    __testReadyTalentData.active = i < I_HIDDEN_AT_FIRST;
    __testReadyTalentItem.recommending.push($.extend({}, __testReadyTalentData));
    __testReadyTalentItem.readyRecommending.push($.extend({}, __testReadyTalentData));
  }

  return __testReadyTalentItem;
});
