!function(i,e){if("undefined"!=typeof module&&void 0!==module.exports){var s=require("jade-runtime");module.exports=e(s)}else"function"==typeof define&&define.amd?define("yp-template",["jade"],e):i.window===i&&(i.ypTemplate=e(i.jade))}(this,function(i){var e={};return e.header=function(i){var e=[],s={},a=i||{};return function(i){s["show-site-header-menu"]=function(i){this&&this.block,this&&this.attributes||{};e.push('<div id="site-header-menu" class="fr"><ul class="site-header-link-menu"><li>'),i&&~i.indexOf("person")&&e.push('<i class="img img-info-new"></i>'),e.push('<a href="#" class="img img-header-menu img-hm-person"></a></li><li>'),i&&~i.indexOf("info")&&e.push('<i class="img img-info-new"></i>'),e.push('<a href="#" class="img img-header-menu img-hm-info"></a></li><li>'),i&&~i.indexOf("mail")&&e.push('<i class="img img-info-new"></i>'),e.push('<a href="#" class="img img-header-menu img-hm-mail"></a></li><li>'),i&&~i.indexOf("switch")&&e.push('<i class="img img-info-new"></i>'),e.push('<a href="#" class="img img-header-menu img-hm-switch"></a></li></ul></div>')},s["show-site-logo"]=function(){this&&this.block,this&&this.attributes||{};e.push('<div id="site-logo" class="fl"><a href="#" class="img img-logo"></a></div>')},s["show-header"]=function(i){this&&this.block,this&&this.attributes||{};e.push('<div class="header-container"><div class="clearfix">'),s["show-site-logo"](),s["show-site-header-menu"](i),e.push("</div></div>")},i&&s["show-header"](i.header.arrNew)}.call(this,"data"in a?a.data:"undefined"!=typeof data?data:void 0),e.join("")},e["home-info-content"]=function(e){var s,a=[],n={},t=e||{};return function(e){var t=5,l=6,o=4;n["info-content-items"]=function(i){this&&this.block,this&&this.attributes||{};(function(){var e=i;if("number"==typeof e.length)for(var s=0,a=e.length;a>s;s++){var t=e[s];n["info-item"](t)}else{var a=0;for(var s in e){a++;var t=e[s];n["info-item"](t)}}}).call(this)},n["info-item"]=function(e){this&&this.block,this&&this.attributes||{};a.push('<div class="info-item clearfix"><div class="info-col-t"><input type="checkbox"/></div><div class="info-col-a">'),n["info-desc"](e.desc.position,e.desc.company),a.push('</div><div class="info-col-b"><div class="info-talent-recommending clearfix"><ul class="info-talent-list">'),function(){var i=e.recommending;if("number"==typeof i.length)for(var s=0,a=i.length;a>s;s++){var t=i[s];l>s&&n["info-talent-person"](t.name,t.isNew,t.level)}else{var a=0;for(var s in i){a++;var t=i[s];l>s&&n["info-talent-person"](t.name,t.isNew,t.level)}}}.call(this),a.push('</ul><a href="#" class="talent-btn img img-arrow-right"></a></div></div><div class="info-col-c"><div class="info-talent-matched clearfix"><ul class="info-talent-list">'),function(){var i=e.matched;if("number"==typeof i.length)for(var s=0,a=i.length;a>s;s++){var t=i[s];o>s&&n["info-talent-person"](t.name,t.isNew,t.level)}else{var a=0;for(var s in i){a++;var t=i[s];o>s&&n["info-talent-person"](t.name,t.isNew,t.level)}}}.call(this),a.push('</ul></div></div><div class="info-col-d"><div class="info-talent-update clearfix"><h5>'+i.escape(null==(s=e.update.ymd)?"":s)+"</h5><h5>"+i.escape(null==(s=e.update.hms)?"":s)+'</h5></div></div><div class="info-col-e"><p><a href="#" class="img-item-4 img-item-record"></a><a href="#" class="img-item-4 img-item-note"></a><a href="#" class="img-item-4 img-item-heart"></a><a href="#" class="img-item-4 img-item-trash"></a></p></div></div>')},n["info-desc"]=function(e,n){this&&this.block,this&&this.attributes||{};a.push('<div class="info-desc">'),e&&a.push('<h2 class="info-position"> '+i.escape(null==(s=e)?"":s)+"</h2>"),n&&a.push('<h3 class="info-company">'+i.escape(null==(s=n)?"":s)+"</h3>"),a.push('<a href="#" class="talent-btn img img-arrow-right"></a></div>')},n["info-talent-person"]=function(e,n,l){var o=(this&&this.block,this&&this.attributes||{},t-l);if(a.push('<li class="info-talent-person"><p class="talent-desc"><a href="#" class="talen-name">'+i.escape(null==(s=e)?"":s)+"</a>"),n&&a.push('<i class="img img-info-new"></i>'),a.push('</p><p class="talent-level">'),l>0)for(l>t&&(l=t);0!==l--;)a.push('<i class="img img-talent img-talent-level-active"></i>');if(o>0)for(o>t&&(o=t);0!==o--;)a.push('<i class="img img-talent img-talent-level"></i>');a.push("</p></li>")},e&&n["info-content-items"](e.content.items)}.call(this,"data"in t?t.data:"undefined"!=typeof data?data:void 0),a.join("")},e["home-info-title"]=function(i){var e=[],s={},a=i||{};return function(i){s["home-info-titles"]=function(){this&&this.block,this&&this.attributes||{};e.push('<div class="clearfix"><div class="info-col-t"></div><div class="info-col-a"><h2>职位</h2></div><div class="info-col-b"><h2>推荐中人才</h2></div><div class="info-col-c"><h2>匹配人才</h2></div><div class="info-col-d"><h2>更新时间</h2></div><div class="info-col-e"></div></div>')},i&&s["home-info-titles"]()}.call(this,"data"in a?a.data:"undefined"!=typeof data?data:void 0),e.join("")},e["info-crumb"]=function(e){var s,a=[],n={},t=e||{};return function(e){n["info-crumb"]=function(e){this&&this.block,this&&this.attributes||{};a.push('<p><a href="#" class="info-all-positions">所有职位</a><i class="img img-arrow-right"></i><a href="#" class="info-current-city"><span>'+i.escape(null==(s=e.city)?"":s)+'</span><i class="img img-delete"></i></a><i class="img img-arrow-right"></i><a href="#" class="info-sum-positions">共<span>'+i.escape(null==(s=e.sum)?"":s)+"</span>个职位</a></p>")},e&&n["info-crumb"](e.content.crumb.postionData)}.call(this,"data"in t?t.data:"undefined"!=typeof data?data:void 0),a.join("")},e.pagination=function(e){var s,a=[],n={},t=e||{};return function(e){n["make-pagination"]=function(e,n){this&&this.block,this&&this.attributes||{};(!e||1>e)&&(e=1),(!n||1>n)&&(n=1);var t=e+n-1,l=1;if(n>=5&&(n=5),a.push('<div id="pagination"><p>'),1>=n||1>=e?a.push('<a href="#" class="pagination-btn-prev pagination-no-use">|<</a><a href="#" class="pagination-btn-prev pagination-no-use">上一页</a>'):a.push('<a class="pagination-btn-prev">|<</a><a class="pagination-btn-prev">上一页</a>'),a.push('<a href="#" class="pagination-num pagination-active">'+i.escape(null==(s=e)?"":s)+"</a>"),n>1)for(;n>l;)a.push('<a href="#" class="pagination-num">'+i.escape(null==(s=e+l)?"":s)+"</a>"),l++;a.push('<span class="pagination-ellipsis">...</span><a href="#" class="pagination-btn-next">下一页</a><a href="#" class="pagination-btn-next">>|</a><span class="pagination-empty"></span><span class="pagination-jump-to">跳转到</span><input type="text" value="" class="pagination-custom-num"/><span class="pagination-jump-to">页</span><a href="#" class="pagination-btn-enter">确定</a><span class="pagination-hidden-sum">'+i.escape(null==(s=t)?"":s)+"</span></p></div>")},e&&n["make-pagination"](e.content.pagination.start,e.content.pagination.times)}.call(this,"data"in t?t.data:"undefined"!=typeof data?data:void 0),a.join("")},e["selection-menu"]=function(e){var s,a=[],n={},t=e||{};return function(e){var t=4;n["selection-job-states"]=function(e){this&&this.block,this&&this.attributes||{};a.push('<ul class="selection-job-btns">'),function(){var n=e;if("number"==typeof n.length)for(var t=0,l=n.length;l>t;t++){var o=n[t];a.push('<li><a href="#">'+i.escape(null==(s=o)?"":s)+"</a></li>")}else{var l=0;for(var t in n){l++;var o=n[t];a.push('<li><a href="#">'+i.escape(null==(s=o)?"":s)+"</a></li>")}}}.call(this),a.push("</ul>")},n["selection-industries"]=function(e){this&&this.block,this&&this.attributes||{};(function(){var n=e;if("number"==typeof n.length)for(var l=0,o=n.length;o>l;l++){var c=n[l];a.push('<div class="selection-industry"><a class="selection-industry-name">'+i.escape(null==(s=c.name)?"":s)+'</a><ul class="selection-industry-list clearfix">'),function(){var e=c.items;if("number"==typeof e.length)for(var n=0,l=e.length;l>n;n++){var o=e[n];t>n&&(a.push('<li><a class="selection-industry-item-name">'+i.escape(null==(s=o.name)?"":s)+'</a><p class="selection-industry-item-content">'),function(){var e=o.content;if("number"==typeof e.length)for(var n=0,t=e.length;t>n;n++){var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}else{var t=0;for(var n in e){t++;var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}}}.call(this),a.push("</p></li>"))}else{var l=0;for(var n in e){l++;var o=e[n];t>n&&(a.push('<li><a class="selection-industry-item-name">'+i.escape(null==(s=o.name)?"":s)+'</a><p class="selection-industry-item-content">'),function(){var e=o.content;if("number"==typeof e.length)for(var n=0,t=e.length;t>n;n++){var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}else{var t=0;for(var n in e){t++;var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}}}.call(this),a.push("</p></li>"))}}}.call(this),a.push("</ul></div>")}else{var o=0;for(var l in n){o++;var c=n[l];a.push('<div class="selection-industry"><a class="selection-industry-name">'+i.escape(null==(s=c.name)?"":s)+'</a><ul class="selection-industry-list clearfix">'),function(){var e=c.items;if("number"==typeof e.length)for(var n=0,l=e.length;l>n;n++){var o=e[n];t>n&&(a.push('<li><a class="selection-industry-item-name">'+i.escape(null==(s=o.name)?"":s)+'</a><p class="selection-industry-item-content">'),function(){var e=o.content;if("number"==typeof e.length)for(var n=0,t=e.length;t>n;n++){var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}else{var t=0;for(var n in e){t++;var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}}}.call(this),a.push("</p></li>"))}else{var l=0;for(var n in e){l++;var o=e[n];t>n&&(a.push('<li><a class="selection-industry-item-name">'+i.escape(null==(s=o.name)?"":s)+'</a><p class="selection-industry-item-content">'),function(){var e=o.content;if("number"==typeof e.length)for(var n=0,t=e.length;t>n;n++){var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}else{var t=0;for(var n in e){t++;var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}}}.call(this),a.push("</p></li>"))}}}.call(this),a.push("</ul></div>")}}}).call(this)},n["selection-cities"]=function(e){this&&this.block,this&&this.attributes||{};a.push('<p class="selection-city-i"><a href="#" class="active">全国</a>'),function(){var n=e.i;if("number"==typeof n.length)for(var t=0,l=n.length;l>t;t++){var o=n[t];a.push('<a href="#">'+i.escape(null==(s=o)?"":s)+"</a>")}else{var l=0;for(var t in n){l++;var o=n[t];a.push('<a href="#">'+i.escape(null==(s=o)?"":s)+"</a>")}}}.call(this),a.push('</p><p class="selection-city-ii">'),function(){var n=e.ii;if("number"==typeof n.length)for(var t=0,l=n.length;l>t;t++){var o=n[t];a.push('<a href="#">'+i.escape(null==(s=o)?"":s)+"</a>")}else{var l=0;for(var t in n){l++;var o=n[t];a.push('<a href="#">'+i.escape(null==(s=o)?"":s)+"</a>")}}}.call(this),a.push('</p><p class="selection-city-iii">'),function(){var n=e.iii;if("number"==typeof n.length)for(var t=0,l=n.length;l>t;t++){var o=n[t];a.push('<a href="#">'+i.escape(null==(s=o)?"":s)+"</a>")}else{var l=0;for(var t in n){l++;var o=n[t];a.push('<a href="#">'+i.escape(null==(s=o)?"":s)+"</a>")}}}.call(this),a.push("</p>")},n["selection-customers"]=function(e){this&&this.block,this&&this.attributes||{};a.push("<ul>"),function(){var n=e;if("number"==typeof n.length)for(var t=0,l=n.length;l>t;t++){var o=n[t];a.push('<li><a class="selection-customer-name">'+i.escape(null==(s=o.industryName)?"":s)+'</a><div class="selection-customer-content">'),function(){var e=o.industryCompanies;if("number"==typeof e.length)for(var n=0,t=e.length;t>n;n++){var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}else{var t=0;for(var n in e){t++;var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}}}.call(this),a.push("</div></li>")}else{var l=0;for(var t in n){l++;var o=n[t];a.push('<li><a class="selection-customer-name">'+i.escape(null==(s=o.industryName)?"":s)+'</a><div class="selection-customer-content">'),function(){var e=o.industryCompanies;if("number"==typeof e.length)for(var n=0,t=e.length;t>n;n++){var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}else{var t=0;for(var n in e){t++;var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}}}.call(this),a.push("</div></li>")}}}.call(this),a.push("</ul>")},n["selection-managers"]=function(e){this&&this.block,this&&this.attributes||{};a.push("<ul>"),function(){var n=e;if("number"==typeof n.length)for(var t=0,l=n.length;l>t;t++){var o=n[t];a.push("<li>"),function(){var e=o;if("number"==typeof e.length)for(var n=0,t=e.length;t>n;n++){var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}else{var t=0;for(var n in e){t++;var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}}}.call(this),a.push("</li>")}else{var l=0;for(var t in n){l++;var o=n[t];a.push("<li>"),function(){var e=o;if("number"==typeof e.length)for(var n=0,t=e.length;t>n;n++){var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}else{var t=0;for(var n in e){t++;var l=e[n];a.push('<a href="#">'+i.escape(null==(s=l)?"":s)+"</a>")}}}.call(this),a.push("</li>")}}}.call(this),a.push("</ul>")},n["selection-memu"]=function(i){this&&this.block,this&&this.attributes||{};a.push('<div class="selection-nav-list clearfix"><a href="#" index="0" class="selection-nav selction-nav-job-state"><i class="img img-selction img-job-state"></i><span>职位状态</span><div class="selection-mask"></div></a><a href="#" index="1" class="selection-nav selction-nav-industry-function"><i class="img img-selction img-industry-function"></i><span>行业职能</span><div class="selection-mask"></div></a><a href="#" index="2" class="selection-nav selction-nav-cities"><i class="img img-selction img-cities"></i><span>城市</span><div class="selection-mask"></div></a><a href="#" index="3" class="selection-nav selction-nav-customer"><i class="img img-selction img-customer"></i><span>客户</span><div class="selection-mask"></div></a><a href="#" index="4" class="selection-nav selction-nav-customer-manager"><i class="img img-selction img-customer-manager"></i><span> 客户经理</span><div class="selection-mask"></div></a></div><div class="selection-content-list"><div index="0" class="selection-content selection-content-job-states">'),n["selection-job-states"](i.jobStates),a.push('</div><div index="1" class="selection-content selection-content-industries-function">'),n["selection-industries"](i.industries),a.push('</div><div index="2" class="selection-content selection-content-cities">'),n["selection-cities"](i.cities),a.push('</div><div index="3" class="selection-content selection-content-customers">'),n["selection-customers"](i.customers),a.push('</div><div index="4" class="selection-content selection-content-managers">'),n["selection-managers"](i.managers),a.push('</div></div><div id="selection-menu-search"><input type="text"/><a href="#" class="img img-magnify"></a></div>')},e&&n["selection-memu"](e.content.selection.memu)}.call(this,"data"in t?t.data:"undefined"!=typeof data?data:void 0),a.join("")},e.side=function(i){var e=[],s={},a=i||{};return function(i){s.side=function(){this&&this.block,this&&this.attributes||{};e.push('<div class="tab-v"><ul class="tab-v-nav"><li><a href="#" class="img img-side img-home"></a></li><li><a href="#" class="img img-side img-member"></a></li><li><a href="#" class="img img-side img-briefcase"></a></li><li><a href="#" class="img img-side img-handon"></a></li><li><a href="#" class="img img-side img-books"></a></li></ul></div>')},i&&s.side()}.call(this,"data"in a?a.data:"undefined"!=typeof data?data:void 0),e.join("")},e.user=function(e){var s,a=[],n={},t=e||{};return function(e){n["show-user"]=function(i){this&&this.block,this&&this.attributes||{};n["show-user-base"](i),n["show-user-info"](i.info),n["show-user-function"]()},n["show-user-base"]=function(i){this&&this.block,this&&this.attributes||{};a.push('<div id="user-base">'),n["say-hello-to-user"](i.name),n["show-date-for-user"](i.date),n["show-address-for-user"](i.address),a.push("</div>")},n["say-hello-to-user"]=function(e){this&&this.block,this&&this.attributes||{};a.push('<div class="user-hello"><h2><span class="username">'+i.escape(null==(s=e)?"":s)+"</span>&nbsp;, 早上好</h2></div>")},n["show-date-for-user"]=function(e){this&&this.block,this&&this.attributes||{};a.push('<p id="date"><i class="date-week">'+i.escape(null==(s=e.week)?"":s)+'</i><i class="date-year">'+i.escape(null==(s=e.year)?"":s)+'</i><i class="date-month">'+i.escape(null==(s=e.month)?"":s)+'</i><i class="date-day">'+i.escape(null==(s=e.day)?"":s)+"</i></p>")},n["show-address-for-user"]=function(e){this&&this.block,this&&this.attributes||{};a.push('<p class="weather-info"><i id="user-city">'+i.escape(null==(s=e.name)?"":s)+'</i><i id="temperature"> '+i.escape(null==(s=e.temperature)?"":s)+'</i><i class="weather-du">o</i><i>C</i></p><p class="weather-quality"><i>空气质量:</i><i id="weather-quality-condition"> '+i.escape(null==(s=e.airQualityCondition)?"":s)+"</i>"),n["show-weather-condition"](e.weatherCondition),a.push("</p>")},n["show-weather-condition"]=function(i){this&&this.block,this&&this.attributes||{};if(i)switch(i){case"perfect":a.push('<a class="img img-weather weather-condition-image"></a>');break;case"good":a.push('<a class="img img-weather weather-condition-image"></a>');break;case"rain":a.push('<a class="img img-weather weather-condition-image"></a>');break;case"cloudy":a.push('<a class="img img-weather weather-condition-image"></a>');break;case"very big rain":a.push('<a class="img img-weather weather-condition-image"></a>');break;case"big rain":a.push('<a class="img img-weather weather-condition-image"></a>');break;case"middle rain":a.push('<a class="img img-weather weather-condition-image"></a>');break;case"small rain":a.push('<a class="img img-weather weather-condition-image"></a>');break;case"very small rain":a.push('<a class="img img-weather weather-condition-image"></a>');break;default:a.push('<a class="img img-weather weather-condition-image"></a>')}},n["show-user-info"]=function(e){this&&this.block,this&&this.attributes||{};a.push('<div id="user-info"><p><span><a id="user-info-num-receive-cvs" href="#" class="user-info-num">'+i.escape(null==(s=e.receive)?"":s)+'</a></span><a href="#">收到简历</a></p><p><span><a id="user-info-num-delegate-position" href="#" class="user-info-num">'+i.escape(null==(s=e.delegate)?"":s)+'</a></span><a href="#">委托职位</a></p><p><span><a id="user-info-num-recommend-feedback" href="#" class="user-info-num">'+i.escape(null==(s=e.recommendFeedback)?"":s)+'</a></span><a href="#">推荐反馈</a></p><p><span><a id="user-info-num-feedback-apply" href="#" class="user-info-num">'+i.escape(null==(s=e.feedbackApply)?"":s)+'</a></span><a href="#">反馈申请</a></p><p><span><a id="user-info-num-build-match" href="#" class="user-info-num">'+i.escape(null==(s=e.buildMatch)?"":s)+'</a></span><a href="#">建立匹配</a></p></div>')},n["show-user-function"]=function(){this&&this.block,this&&this.attributes||{};a.push('<div id="user-function"><div class="user-publish-postion"><a href="#" class="img img-publish-position"></a></div><div class="user-deledate-postion"><a href="#" class="img img-delegate-position"></a></div></div>')},e&&n["show-user"](e.user)}.call(this,"data"in t?t.data:"undefined"!=typeof data?data:void 0),a.join("")},e});