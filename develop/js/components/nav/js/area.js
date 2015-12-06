define(function () {
  return {
    provinces: [{
      text: '北京',
      value: '北京'
    }, {
      text: '上海',
      value: '上海'
    }, {
      text: '天津',
      value: '天津'
    }, {
      text: '重庆',
      value: '重庆'
    }, {
      text: '河北',
      value: '河北'
    }, {
      text: '山西',
      value: '山西'
    }, {
      text: '内蒙古',
      value: '内蒙古'
    }, {
      text: '辽宁',
      value: '辽宁'
    }, {
      text: '吉林',
      value: '吉林'
    }, {
      text: '黑龙江',
      value: '黑龙江'
    }, {
      text: '江苏',
      value: '江苏'
    }, {
      text: '浙江',
      value: '浙江'
    }, {
      text: '安徽',
      value: '安徽'
    }, {
      text: '福建',
      value: '福建'
    }, {
      text: '江西',
      value: '江西'
    }, {
      text: '山东',
      value: '山东'
    }, {
      text: '河南',
      value: '河南'
    }, {
      text: '湖北',
      value: '湖北'
    }, {
      text: '湖南',
      value: '湖南'
    }, {
      text: '广东',
      value: '广东'
    }, {
      text: '广西',
      value: '广西'
    }, {
      text: '海南',
      value: '海南'
    }, {
      text: '四川',
      value: '四川'
    }, {
      text: '贵州',
      value: '贵州'
    }, {
      text: '云南',
      value: '云南'
    }, {
      text: '西藏',
      value: '西藏'
    }, {
      text: '陕西',
      value: '陕西'
    }, {
      text: '甘肃',
      value: '甘肃'
    }, {
      text: '宁夏',
      value: '宁夏'
    }, {
      text: '青海',
      value: '青海'
    }, {
      text: '新疆',
      value: '新疆'
    }],
    citys: {
      '北京': [{
        text: '东城',
        value: '东城'
      }, {
        text: '西城',
        value: '西城'
      }, {
        text: '崇文',
        value: '崇文'
      }, {
        text: '宣武',
        value: '宣武'
      }, {
        text: '朝阳',
        value: '朝阳'
      }, {
        text: '丰台',
        value: '丰台'
      }, {
        text: '石景山',
        value: '石景山'
      }, {
        text: '海淀',
        value: '海淀'
      }, {
        text: '门头沟',
        value: '门头沟'
      }, {
        text: '房山',
        value: '房山'
      }, {
        text: '通州',
        value: '通州'
      }, {
        text: '顺义',
        value: '顺义'
      }, {
        text: '昌平',
        value: '昌平'
      }, {
        text: '大兴',
        value: '大兴'
      }, {
        text: '平谷',
        value: '平谷'
      }, {
        text: '怀柔',
        value: '怀柔'
      }, {
        text: '密云',
        value: '密云'
      }, {
        text: '延庆',
        value: '延庆'
      }],
      '上海': [{
        text: '黄浦',
        value: '黄浦'
      }, {
        text: '卢湾',
        value: '卢湾'
      }, {
        text: '徐汇',
        value: '徐汇'
      }, {
        text: '长宁',
        value: '长宁'
      }, {
        text: '静安',
        value: '静安'
      }, {
        text: '普陀',
        value: '普陀'
      }, {
        text: '闸北',
        value: '闸北'
      }, {
        text: '虹口',
        value: '虹口'
      }, {
        text: '杨浦',
        value: '杨浦'
      }, {
        text: '闵行',
        value: '闵行'
      }, {
        text: '宝山',
        value: '宝山'
      }, {
        text: '嘉定',
        value: '嘉定'
      }, {
        text: '浦东',
        value: '浦东'
      }, {
        text: '金山',
        value: '金山'
      }, {
        text: '松江',
        value: '松江'
      }, {
        text: '青浦',
        value: '青浦'
      }, {
        text: '南汇',
        value: '南汇'
      }, {
        text: '奉贤',
        value: '奉贤'
      }, {
        text: '崇明',
        value: '崇明'
      }],
      '天津': [{
        text: '和平',
        value: '和平'
      }, {
        text: '东丽',
        value: '东丽'
      }, {
        text: '河东',
        value: '河东'
      }, {
        text: '西青',
        value: '西青'
      }, {
        text: '河西',
        value: '河西'
      }, {
        text: '津南',
        value: '津南'
      }, {
        text: '南开',
        value: '南开'
      }, {
        text: '北辰',
        value: '北辰'
      }, {
        text: '河北',
        value: '河北'
      }, {
        text: '武清',
        value: '武清'
      }, {
        text: '红挢',
        value: '红挢'
      }, {
        text: '塘沽',
        value: '塘沽'
      }, {
        text: '汉沽',
        value: '汉沽'
      }, {
        text: '大港',
        value: '大港'
      }, {
        text: '宁河',
        value: '宁河'
      }, {
        text: '静海',
        value: '静海'
      }, {
        text: '宝坻',
        value: '宝坻'
      }, {
        text: '蓟县',
        value: '蓟县'
      }],
      '重庆': [{
        text: '万州',
        value: '万州'
      }, {
        text: '涪陵',
        value: '涪陵'
      }, {
        text: '渝中',
        value: '渝中'
      }, {
        text: '大渡口',
        value: '大渡口'
      }, {
        text: '江北',
        value: '江北'
      }, {
        text: '沙坪坝',
        value: '沙坪坝'
      }, {
        text: '九龙坡',
        value: '九龙坡'
      }, {
        text: '南岸',
        value: '南岸'
      }, {
        text: '北碚',
        value: '北碚'
      }, {
        text: '万盛',
        value: '万盛'
      }, {
        text: '双挢',
        value: '双挢'
      }, {
        text: '渝北',
        value: '渝北'
      }, {
        text: '巴南',
        value: '巴南'
      }, {
        text: '黔江',
        value: '黔江'
      }, {
        text: '长寿',
        value: '长寿'
      }, {
        text: '綦江',
        value: '綦江'
      }, {
        text: '潼南',
        value: '潼南'
      }, {
        text: '铜梁',
        value: '铜梁'
      }, {
        text: '大足',
        value: '大足'
      }, {
        text: '荣昌',
        value: '荣昌'
      }, {
        text: '壁山',
        value: '壁山'
      }, {
        text: '梁平',
        value: '梁平'
      }, {
        text: '城口',
        value: '城口'
      }, {
        text: '丰都',
        value: '丰都'
      }, {
        text: '垫江',
        value: '垫江'
      }, {
        text: '武隆',
        value: '武隆'
      }, {
        text: '忠县',
        value: '忠县'
      }, {
        text: '开县',
        value: '开县'
      }, {
        text: '云阳',
        value: '云阳'
      }, {
        text: '奉节',
        value: '奉节'
      }, {
        text: '巫山',
        value: '巫山'
      }, {
        text: '巫溪',
        value: '巫溪'
      }, {
        text: '石柱',
        value: '石柱'
      }, {
        text: '秀山',
        value: '秀山'
      }, {
        text: '酉阳',
        value: '酉阳'
      }, {
        text: '彭水',
        value: '彭水'
      }, {
        text: '江津',
        value: '江津'
      }, {
        text: '合川',
        value: '合川'
      }, {
        text: '永川',
        value: '永川'
      }, {
        text: '南川',
        value: '南川'
      }],
      '河北': [{
        text: '石家庄',
        value: '石家庄'
      }, {
        text: '邯郸',
        value: '邯郸'
      }, {
        text: '邢台',
        value: '邢台'
      }, {
        text: '保定',
        value: '保定'
      }, {
        text: '张家口',
        value: '张家口'
      }, {
        text: '承德',
        value: '承德'
      }, {
        text: '廊坊',
        value: '廊坊'
      }, {
        text: '唐山',
        value: '唐山'
      }, {
        text: '秦皇岛',
        value: '秦皇岛'
      }, {
        text: '沧州',
        value: '沧州'
      }, {
        text: '衡水',
        value: '衡水'
      }],
      '山西': [{
        text: '太原',
        value: '太原'
      }, {
        text: '大同',
        value: '大同'
      }, {
        text: '阳泉',
        value: '阳泉'
      }, {
        text: '长治',
        value: '长治'
      }, {
        text: '晋城',
        value: '晋城'
      }, {
        text: '朔州',
        value: '朔州'
      }, {
        text: '吕梁',
        value: '吕梁'
      }, {
        text: '忻州',
        value: '忻州'
      }, {
        text: '晋中',
        value: '晋中'
      }, {
        text: '临汾',
        value: '临汾'
      }, {
        text: '运城',
        value: '运城'
      }],
      '内蒙古': [{
        text: '呼和浩特',
        value: '呼和浩特'
      }, {
        text: '包头',
        value: '包头'
      }, {
        text: '乌海',
        value: '乌海'
      }, {
        text: '赤峰',
        value: '赤峰'
      }, {
        text: '呼伦贝尔盟',
        value: '呼伦贝尔盟'
      }, {
        text: '阿拉善盟',
        value: '阿拉善盟'
      }, {
        text: '哲里木盟',
        value: '哲里木盟'
      }, {
        text: '兴安盟',
        value: '兴安盟'
      }, {
        text: '乌兰察布盟',
        value: '乌兰察布盟'
      }, {
        text: '锡林郭勒盟',
        value: '锡林郭勒盟'
      }, {
        text: '巴彦淖尔盟',
        value: '巴彦淖尔盟'
      }, {
        text: '伊克昭盟',
        value: '伊克昭盟'
      }],
      '辽宁': [{
        text: '沈阳',
        value: '沈阳'
      }, {
        text: '大连',
        value: '大连'
      }, {
        text: '鞍山',
        value: '鞍山'
      }, {
        text: '抚顺',
        value: '抚顺'
      }, {
        text: '本溪',
        value: '本溪'
      }, {
        text: '丹东',
        value: '丹东'
      }, {
        text: '锦州',
        value: '锦州'
      }, {
        text: '营口',
        value: '营口'
      }, {
        text: '阜新',
        value: '阜新'
      }, {
        text: '辽阳',
        value: '辽阳'
      }, {
        text: '盘锦',
        value: '盘锦'
      }, {
        text: '铁岭',
        value: '铁岭'
      }, {
        text: '朝阳',
        value: '朝阳'
      }, {
        text: '葫芦岛',
        value: '葫芦岛'
      }],
      '吉林': [{
        text: '长春',
        value: '长春'
      }, {
        text: '吉林',
        value: '吉林'
      }, {
        text: '四平',
        value: '四平'
      }, {
        text: '辽源',
        value: '辽源'
      }, {
        text: '通化',
        value: '通化'
      }, {
        text: '白山',
        value: '白山'
      }, {
        text: '松原',
        value: '松原'
      }, {
        text: '白城',
        value: '白城'
      }, {
        text: '延边',
        value: '延边'
      }],
      '黑龙江': [{
        text: '哈尔滨',
        value: '哈尔滨'
      }, {
        text: '齐齐哈尔',
        value: '齐齐哈尔'
      }, {
        text: '牡丹江',
        value: '牡丹江'
      }, {
        text: '佳木斯',
        value: '佳木斯'
      }, {
        text: '大庆',
        value: '大庆'
      }, {
        text: '绥化',
        value: '绥化'
      }, {
        text: '鹤岗',
        value: '鹤岗'
      }, {
        text: '鸡西',
        value: '鸡西'
      }, {
        text: '黑河',
        value: '黑河'
      }, {
        text: '双鸭山',
        value: '双鸭山'
      }, {
        text: '伊春',
        value: '伊春'
      }, {
        text: '七台河',
        value: '七台河'
      }, {
        text: '大兴安岭',
        value: '大兴安岭'
      }],
      '江苏': [{
        text: '南京',
        value: '南京'
      }, {
        text: '镇江',
        value: '镇江'
      }, {
        text: '苏州',
        value: '苏州'
      }, {
        text: '南通',
        value: '南通'
      }, {
        text: '扬州',
        value: '扬州'
      }, {
        text: '盐城',
        value: '盐城'
      }, {
        text: '徐州',
        value: '徐州'
      }, {
        text: '连云港',
        value: '连云港'
      }, {
        text: '常州',
        value: '常州'
      }, {
        text: '无锡',
        value: '无锡'
      }, {
        text: '宿迁',
        value: '宿迁'
      }, {
        text: '泰州',
        value: '泰州'
      }, {
        text: '淮安',
        value: '淮安'
      }],
      '浙江': [{
        text: '杭州',
        value: '杭州'
      }, {
        text: '宁波',
        value: '宁波'
      }, {
        text: '温州',
        value: '温州'
      }, {
        text: '嘉兴',
        value: '嘉兴'
      }, {
        text: '湖州',
        value: '湖州'
      }, {
        text: '绍兴',
        value: '绍兴'
      }, {
        text: '金华',
        value: '金华'
      }, {
        text: '衢州',
        value: '衢州'
      }, {
        text: '舟山',
        value: '舟山'
      }, {
        text: '台州',
        value: '台州'
      }, {
        text: '丽水',
        value: '丽水'
      }],
      '安徽': [{
        text: '合肥',
        value: '合肥'
      }, {
        text: '芜湖',
        value: '芜湖'
      }, {
        text: '蚌埠',
        value: '蚌埠'
      }, {
        text: '马鞍山',
        value: '马鞍山'
      }, {
        text: '淮北',
        value: '淮北'
      }, {
        text: '铜陵',
        value: '铜陵'
      }, {
        text: '安庆',
        value: '安庆'
      }, {
        text: '黄山',
        value: '黄山'
      }, {
        text: '滁州',
        value: '滁州'
      }, {
        text: '宿州',
        value: '宿州'
      }, {
        text: '池州',
        value: '池州'
      }, {
        text: '淮南',
        value: '淮南'
      }, {
        text: '巢湖',
        value: '巢湖'
      }, {
        text: '阜阳',
        value: '阜阳'
      }, {
        text: '六安',
        value: '六安'
      }, {
        text: '宣城',
        value: '宣城'
      }, {
        text: '亳州',
        value: '亳州'
      }],
      '福建': [{
        text: '福州',
        value: '福州'
      }, {
        text: '厦门',
        value: '厦门'
      }, {
        text: '莆田',
        value: '莆田'
      }, {
        text: '三明',
        value: '三明'
      }, {
        text: '泉州',
        value: '泉州'
      }, {
        text: '漳州',
        value: '漳州'
      }, {
        text: '南平',
        value: '南平'
      }, {
        text: '龙岩',
        value: '龙岩'
      }, {
        text: '宁德',
        value: '宁德'
      }],
      '江西': [{
        text: '南昌市',
        value: '南昌市'
      }, {
        text: '景德镇',
        value: '景德镇'
      }, {
        text: '九江',
        value: '九江'
      }, {
        text: '鹰潭',
        value: '鹰潭'
      }, {
        text: '萍乡',
        value: '萍乡'
      }, {
        text: '新馀',
        value: '新馀'
      }, {
        text: '赣州',
        value: '赣州'
      }, {
        text: '吉安',
        value: '吉安'
      }, {
        text: '宜春',
        value: '宜春'
      }, {
        text: '抚州',
        value: '抚州'
      }, {
        text: '上饶',
        value: '上饶'
      }],
      '山东': [{
        text: '济南',
        value: '济南'
      }, {
        text: '青岛',
        value: '青岛'
      }, {
        text: '淄博',
        value: '淄博'
      }, {
        text: '枣庄',
        value: '枣庄'
      }, {
        text: '东营',
        value: '东营'
      }, {
        text: '烟台',
        value: '烟台'
      }, {
        text: '潍坊',
        value: '潍坊'
      }, {
        text: '济宁',
        value: '济宁'
      }, {
        text: '泰安',
        value: '泰安'
      }, {
        text: '威海',
        value: '威海'
      }, {
        text: '日照',
        value: '日照'
      }, {
        text: '莱芜',
        value: '莱芜'
      }, {
        text: '临沂',
        value: '临沂'
      }, {
        text: '德州',
        value: '德州'
      }, {
        text: '聊城',
        value: '聊城'
      }, {
        text: '滨州',
        value: '滨州'
      }, {
        text: '菏泽',
        value: '菏泽'
      }],
      '河南': [{
        text: '郑州',
        value: '郑州'
      }, {
        text: '开封',
        value: '开封'
      }, {
        text: '洛阳',
        value: '洛阳'
      }, {
        text: '平顶山',
        value: '平顶山'
      }, {
        text: '安阳',
        value: '安阳'
      }, {
        text: '鹤壁',
        value: '鹤壁'
      }, {
        text: '新乡',
        value: '新乡'
      }, {
        text: '焦作',
        value: '焦作'
      }, {
        text: '濮阳',
        value: '濮阳'
      }, {
        text: '许昌',
        value: '许昌'
      }, {
        text: '漯河',
        value: '漯河'
      }, {
        text: '三门峡',
        value: '三门峡'
      }, {
        text: '南阳',
        value: '南阳'
      }, {
        text: '商丘',
        value: '商丘'
      }, {
        text: '信阳',
        value: '信阳'
      }, {
        text: '周口',
        value: '周口'
      }, {
        text: '驻马店',
        value: '驻马店'
      }, {
        text: '济源',
        value: '济源'
      }],
      '湖北': [{
        text: '武汉',
        value: '武汉'
      }, {
        text: '宜昌',
        value: '宜昌'
      }, {
        text: '荆州',
        value: '荆州'
      }, {
        text: '襄樊',
        value: '襄樊'
      }, {
        text: '黄石',
        value: '黄石'
      }, {
        text: '荆门',
        value: '荆门'
      }, {
        text: '黄冈',
        value: '黄冈'
      }, {
        text: '十堰',
        value: '十堰'
      }, {
        text: '恩施',
        value: '恩施'
      }, {
        text: '潜江',
        value: '潜江'
      }, {
        text: '天门',
        value: '天门'
      }, {
        text: '仙桃',
        value: '仙桃'
      }, {
        text: '随州',
        value: '随州'
      }, {
        text: '咸宁',
        value: '咸宁'
      }, {
        text: '孝感',
        value: '孝感'
      }, {
        text: '鄂州',
        value: '鄂州'
      }],
      '湖南': [{
        text: '长沙',
        value: '长沙'
      }, {
        text: '常德',
        value: '常德'
      }, {
        text: '株洲',
        value: '株洲'
      }, {
        text: '湘潭',
        value: '湘潭'
      }, {
        text: '衡阳',
        value: '衡阳'
      }, {
        text: '岳阳',
        value: '岳阳'
      }, {
        text: '邵阳',
        value: '邵阳'
      }, {
        text: '益阳',
        value: '益阳'
      }, {
        text: '娄底',
        value: '娄底'
      }, {
        text: '怀化',
        value: '怀化'
      }, {
        text: '郴州',
        value: '郴州'
      }, {
        text: '永州',
        value: '永州'
      }, {
        text: '湘西',
        value: '湘西'
      }, {
        text: '张家界',
        value: '张家界'
      }],
      '广东': [{
        text: '广州',
        value: '广州'
      }, {
        text: '深圳',
        value: '深圳'
      }, {
        text: '珠海',
        value: '珠海'
      }, {
        text: '汕头',
        value: '汕头'
      }, {
        text: '东莞',
        value: '东莞'
      }, {
        text: '中山',
        value: '中山'
      }, {
        text: '佛山',
        value: '佛山'
      }, {
        text: '韶关',
        value: '韶关'
      }, {
        text: '江门',
        value: '江门'
      }, {
        text: '湛江',
        value: '湛江'
      }, {
        text: '茂名',
        value: '茂名'
      }, {
        text: '肇庆',
        value: '肇庆'
      }, {
        text: '惠州',
        value: '惠州'
      }, {
        text: '梅州',
        value: '梅州'
      }, {
        text: '汕尾',
        value: '汕尾'
      }, {
        text: '河源',
        value: '河源'
      }, {
        text: '阳江',
        value: '阳江'
      }, {
        text: '清远',
        value: '清远'
      }, {
        text: '潮州',
        value: '潮州'
      }, {
        text: '揭阳',
        value: '揭阳'
      }, {
        text: '云浮',
        value: '云浮'
      }],
      '广西': [{
        text: '南宁',
        value: '南宁'
      }, {
        text: '柳州',
        value: '柳州'
      }, {
        text: '桂林',
        value: '桂林'
      }, {
        text: '梧州',
        value: '梧州'
      }, {
        text: '北海',
        value: '北海'
      }, {
        text: '防城港',
        value: '防城港'
      }, {
        text: '钦州',
        value: '钦州'
      }, {
        text: '贵港',
        value: '贵港'
      }, {
        text: '玉林',
        value: '玉林'
      }, {
        text: '南宁地区',
        value: '南宁地区'
      }, {
        text: '柳州地区',
        value: '柳州地区'
      }, {
        text: '贺州',
        value: '贺州'
      }, {
        text: '百色',
        value: '百色'
      }, {
        text: '河池',
        value: '河池'
      }],
      '海南': [{
        text: '海口',
        value: '海口'
      }, {
        text: '三亚',
        value: '三亚'
      }],
      '四川': [{
        text: '成都',
        value: '成都'
      }, {
        text: '绵阳',
        value: '绵阳'
      }, {
        text: '德阳',
        value: '德阳'
      }, {
        text: '自贡',
        value: '自贡'
      }, {
        text: '攀枝花',
        value: '攀枝花'
      }, {
        text: '广元',
        value: '广元'
      }, {
        text: '内江',
        value: '内江'
      }, {
        text: '乐山',
        value: '乐山'
      }, {
        text: '南充',
        value: '南充'
      }, {
        text: '宜宾',
        value: '宜宾'
      }, {
        text: '广安',
        value: '广安'
      }, {
        text: '达川',
        value: '达川'
      }, {
        text: '雅安',
        value: '雅安'
      }, {
        text: '眉山',
        value: '眉山'
      }, {
        text: '甘孜',
        value: '甘孜'
      }, {
        text: '凉山',
        value: '凉山'
      }, {
        text: '泸州',
        value: '泸州'
      }],
      '贵州': [{
        text: '贵阳',
        value: '贵阳'
      }, {
        text: '六盘水',
        value: '六盘水'
      }, {
        text: '遵义',
        value: '遵义'
      }, {
        text: '安顺',
        value: '安顺'
      }, {
        text: '铜仁',
        value: '铜仁'
      }, {
        text: '黔西南',
        value: '黔西南'
      }, {
        text: '毕节',
        value: '毕节'
      }, {
        text: '黔东南',
        value: '黔东南'
      }, {
        text: '黔南',
        value: '黔南'
      }],
      '云南': [{
        text: '昆明',
        value: '昆明'
      }, {
        text: '大理',
        value: '大理'
      }, {
        text: '曲靖',
        value: '曲靖'
      }, {
        text: '玉溪',
        value: '玉溪'
      }, {
        text: '昭通',
        value: '昭通'
      }, {
        text: '楚雄',
        value: '楚雄'
      }, {
        text: '红河',
        value: '红河'
      }, {
        text: '文山',
        value: '文山'
      }, {
        text: '思茅',
        value: '思茅'
      }, {
        text: '西双版纳',
        value: '西双版纳'
      }, {
        text: '保山',
        value: '保山'
      }, {
        text: '德宏',
        value: '德宏'
      }, {
        text: '丽江',
        value: '丽江'
      }, {
        text: '怒江',
        value: '怒江'
      }, {
        text: '迪庆',
        value: '迪庆'
      }, {
        text: '临沧',
        value: '临沧'
      }],
      '西藏': [{
        text: '拉萨',
        value: '拉萨'
      }, {
        text: '日喀则',
        value: '日喀则'
      }, {
        text: '山南',
        value: '山南'
      }, {
        text: '林芝',
        value: '林芝'
      }, {
        text: '昌都',
        value: '昌都'
      }, {
        text: '阿里',
        value: '阿里'
      }, {
        text: '那曲',
        value: '那曲'
      }],
      '陕西': [{
        text: '西安',
        value: '西安'
      }, {
        text: '宝鸡',
        value: '宝鸡'
      }, {
        text: '咸阳',
        value: '咸阳'
      }, {
        text: '铜川',
        value: '铜川'
      }, {
        text: '渭南',
        value: '渭南'
      }, {
        text: '延安',
        value: '延安'
      }, {
        text: '榆林',
        value: '榆林'
      }, {
        text: '汉中',
        value: '汉中'
      }, {
        text: '安康',
        value: '安康'
      }, {
        text: '商洛',
        value: '商洛'
      }],
      '甘肃': [{
        text: '兰州',
        value: '兰州'
      }, {
        text: '嘉峪关',
        value: '嘉峪关'
      }, {
        text: '金昌',
        value: '金昌'
      }, {
        text: '白银',
        value: '白银'
      }, {
        text: '天水',
        value: '天水'
      }, {
        text: '酒泉',
        value: '酒泉'
      }, {
        text: '张掖',
        value: '张掖'
      }, {
        text: '武威',
        value: '武威'
      }, {
        text: '定西',
        value: '定西'
      }, {
        text: '陇南',
        value: '陇南'
      }, {
        text: '平凉',
        value: '平凉'
      }, {
        text: '庆阳',
        value: '庆阳'
      }, {
        text: '临夏',
        value: '临夏'
      }, {
        text: '甘南',
        value: '甘南'
      }],
      '宁夏': [{
        text: '银川',
        value: '银川'
      }, {
        text: '石嘴山',
        value: '石嘴山'
      }, {
        text: '吴忠',
        value: '吴忠'
      }, {
        text: '固原',
        value: '固原'
      }],
      '青海': [{
        text: '西宁',
        value: '西宁'
      }, {
        text: '海东',
        value: '海东'
      }, {
        text: '海南',
        value: '海南'
      }, {
        text: '海北',
        value: '海北'
      }, {
        text: '黄南',
        value: '黄南'
      }, {
        text: '玉树',
        value: '玉树'
      }, {
        text: '果洛',
        value: '果洛'
      }, {
        text: '海西',
        value: '海西'
      }],
      '新疆': [{
        text: '乌鲁木齐',
        value: '乌鲁木齐'
      }, {
        text: '石河子',
        value: '石河子'
      }, {
        text: '克拉玛依',
        value: '克拉玛依'
      }, {
        text: '伊犁',
        value: '伊犁'
      }, {
        text: '巴音郭勒',
        value: '巴音郭勒'
      }, {
        text: '昌吉',
        value: '昌吉'
      }, {
        text: '克孜勒苏柯尔克孜',
        value: '克孜勒苏柯尔克孜'
      }, {
        text: '博尔塔拉',
        value: '博尔塔拉'
      }, {
        text: '吐鲁番',
        value: '吐鲁番'
      }, {
        text: '哈密',
        value: '哈密'
      }, {
        text: '喀什',
        value: '喀什'
      }, {
        text: '和田',
        value: '和田'
      }, {
        text: '阿克苏',
        value: '阿克苏'
      }],
    }
  }
});
