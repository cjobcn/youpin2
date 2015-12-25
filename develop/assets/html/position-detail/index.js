;(function (ajaxData) {

define([
  'vue',
  'jquery',
  '$post',
  //'post!' + JSON.stringify({
  //  "url": "home/position/getPositionDetail",
  //  "data": {
  //    "userId": 91,
  //    "positionId": 86
  //  }
  //}),
], function (Vue, $, $post, data) {
  return new Vue({
    el: '.position-detail',
    data: {
      info: ajaxData.info,
      status: ajaxData.status,
      active: false
    },
    methods: {}
  });
});

})({
  "status": 1,

  "info": {
    "positionName": "室内设计经理",
    "clientName": null,
    "city": "上海",
    "customManager": "王霞",
    "salaryMin": "60",
    "salaryMax": "100",
    "publishTime": "04月16日 10:27",
    // "education-demands": 1 -> 1代表什么？
    "educationDemands": "本科",
    "recruitNumber": "1",
    "sex": "不限",
    "workPlace": "待定",
    "reportTo": "室内设计总监",
    "ageMin": "28",
    "ageMax": "38",
    "requirement": "",

    // 对应的数字，对应建立是否可以投递啊什么的。。。
    "positionStatus": 1,

    "customDemands": [
      "从事Android应用软件开发",
      "大学本科，2年以上工作经验，通信.电子工程.软件.等相关专业",
      "有Android或Java开发基础",
      "属性android SDK，具有2年以上实际开发经验者优先",
      "工作积极主动，懂得团队协作，有较强责任感和严谨工作作风，对移动产品有浓厚兴趣",
      "较强的沟通学习能力，对技术有热情，善于主动跟踪和学习最新的软件技术"
    ],

    "positionDetail": [
      "从事Android应用软件开发",
      "大学本科，2年以上工作经验，通信.电子工程.软件.等相关专业",
      "有Android或Java开发基础"
    ],

    "note": "需要：",

    "receivedResumes": [
      {
        "name": "高锟1",
        "consult-name": "陆元敏1",
        "time": "2015-02-02",
        "note": "这是最近的"
      },
      {
        "name": "高锟1",
        "consult-name": "陆元敏1",
        "time": "2015-02-02",
        "note": "这是最近的"
      }
    ],

    "delegatedCompanies": [
      { "id": 1, "value": "第一家公司" },
      { "id": 2, "value": "第二家公司" }
    ],

    "companyDesc" : "浙江数芳科技（以下简称\"su2\"）有限公司作为一家外商独资的移动互联网软件公司，从07年成立至今一直致力与移动互联网软件产品的开发，销售和运营工作。数芳公司从成立伊始就和各大手机品牌厂商以及手机研发公司有较好的合作关系，与电信运营商从2009年开始有较为密切的合作，为浙江电信提供了翼起来，wifi客户端，智慧杭州，天翼看交通等软件产品的开发设计以及运营支持，同时数芳也获得了电信c w客户端解决方案的生成供货资格。数芳公司2013年底开始进***载wifi行业，凭借在移动互联网行业的多年经营基础，迅速完成业务切入，公司旗下的灵无线、公交乐等产品已经在全国许多省份长途车、公交车上进行安装部署，为用户提供免费高速的车载移动网络服务。"
  }
});
