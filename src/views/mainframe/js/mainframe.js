export default {
  
  // 获取远程数据
  fetchRemoteData(){
    let dataSource = []
    this.dataSource.forEach(o => {
      // 时间格式化
      o.createdAt = this.dateFormat(o.created_at)
      dataSource.push(o)
    });
    return dataSource
  },

  // 微信事件格式化
  dateFormat(srcDate) {
    // 转成时间戳 秒 "Tue Apr 09 18:50:03 +0800 2018"
    let timestamp = Date.parse(srcDate) / 1000
    // 拼接 0 的操作
    function zeroize(num) {
      return (String(num).length == 1 ? '0' : '') + num
    }
    var curTimestamp = parseInt(new Date().getTime() / 1000) //当前时间戳
    var timestampDiff = curTimestamp - timestamp // 参数时间戳与当前时间戳相差秒数
    var tmDate = new Date(timestamp * 1000) // 参数时间戳转换成的日期对象
    var Y = tmDate.getFullYear(),
      m = tmDate.getMonth() + 1,
      d = tmDate.getDate()
    if (timestampDiff < 60) {
      // 一分钟以内
      return '刚刚'
    } else if (timestampDiff < 3600) {
      // 一小时以内 xx分钟前
      return Math.floor(timestampDiff / 60) + '分钟前'
    } else if (timestampDiff < 86400) {
      // 一天之之内 xx小时前
      return Math.floor(timestampDiff / 3600) + '小时前'
    } else if (timestampDiff < 86400 * 2) {
      // 二天之内 昨天
      return '昨天'
    } else if (timestampDiff < 86400 * 365) {
      // 一年之内 xxx天前
      return Math.floor(timestampDiff / 86400) + '天前'
    } else {
      // 超过一年 yyyy年MM月dd日
      return Y + '年' + zeroize(m) + '月' + zeroize(d) + '日'
    }
  },
  // 数据源
  dataSource:[
    {
      avatars: [
        { 
          profile_image_url: require('@/assets/images/mainframe/tencent_news.png')
        }
      ],
      screen_name: '腾讯新闻',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '工作996，生病ICU？关注：年轻人该如何奋斗'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp4.sinaimg.cn/1448595507/50/22871434059/1' 
        }
      ],
      screen_name: 'UI中国',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '生死看淡，不服就干'
    },
    {
      avatars: [
        { 
          profile_image_url: require('@/assets/images/mainframe/wechat_motion.png')
        }
      ],
      screen_name: '微信运动',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '[应用消息]'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp3.sinaimg.cn/2630646082/50/40073330660/1' 
        }
      ],
      screen_name: 'photoshop资源库',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '生死看淡，不服就干'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp3.sinaimg.cn/3704303362/50/5731726065/0' 
        }
      ],
      screen_name: 'Lightroom资源库',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '生死看淡，不服就干'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp2.sinaimg.cn/3178541805/50/5718597241/1' 
        }
      ],
      screen_name: 'Sai资源库',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '[动画表情]'
    },
    {
      avatars: [
        { 
          profile_image_url: require('@/assets/images/mainframe/wechat_game.png')
        }
      ],
      screen_name: '微信游戏',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '【订阅号消息】我的王者荣耀战报'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp2.sinaimg.cn/1401527553/50/5648353790/1' 
        }
      ],
      screen_name: 'tombkeeper',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '湖人总冠军'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp1.sinaimg.cn/1648494332/50/40061279636/1' 
        }
      ],
      screen_name: '包昊军',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '卡哇伊FMVP'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp1.sinaimg.cn/3256556000/50/5733114143/1' 
        }
      ],
      screen_name: 'WETALK观点',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '如果世界上真有超级英雄，那人就是勒布朗.詹姆斯'
    },
    {
      avatars: [
        { 
          profile_image_url: require('@/assets/images/mainframe/qq_safeguard.png')
        }
      ],
      screen_name: 'QQ安全中心',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '请接招：这里有份QQ防封秘籍！'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp4.sinaimg.cn/1448595507/50/22871434059/1' 
        },
        { 
          profile_image_url: 'http://tp3.sinaimg.cn/2630646082/50/40073330660/1' 
        },
        { 
          profile_image_url: 'http://tp1.sinaimg.cn/2236171720/50/5733018646/0' 
        }
      ],
      screen_name: '三人行必有我师焉',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '人可何：你是年少的欢喜，喜欢的少年是你'
    },
    {
      avatars: [
        { 
          profile_image_url: require('@/assets/images/mainframe/subscription_number.png')
        }
      ],
      screen_name: '订阅号消息',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '脚踝终结者：德鲁大叔 凯里.欧文'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp4.sinaimg.cn/1448595507/50/22871434059/1' 
        },
        { 
          profile_image_url: 'http://tp3.sinaimg.cn/2630646082/50/40073330660/1' 
        },
        { 
          profile_image_url: 'http://tp1.sinaimg.cn/2236171720/50/5733018646/0' 
        },
        {
          profile_image_url: 'http://tp3.sinaimg.cn/3704303362/50/5731726065/0'
        }
      ],
      screen_name: '春花、秋月、夏日、冬雪',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '单人伍：纵然时间山南水北，你我人山人海，你来 所以我等'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp4.sinaimg.cn/1448595507/50/22871434059/1' 
        },
        { 
          profile_image_url: 'http://tp3.sinaimg.cn/2630646082/50/40073330660/1' 
        },
        { 
          profile_image_url: 'http://tp1.sinaimg.cn/2236171720/50/5733018646/0' 
        },
        {
          profile_image_url: 'http://tp3.sinaimg.cn/3704303362/50/5731726065/0'
        },
        {
          profile_image_url: 'http://tp2.sinaimg.cn/3178541805/50/5718597241/1'
        }
      ],
      screen_name: '深圳五虎（diao）将（si）',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '大成：情深深，雨蒙蒙，车如流水马如龙'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp4.sinaimg.cn/1448595507/50/22871434059/1' 
        },
        { 
          profile_image_url: 'http://tp3.sinaimg.cn/2630646082/50/40073330660/1' 
        },
        { 
          profile_image_url: 'http://tp1.sinaimg.cn/2236171720/50/5733018646/0' 
        },
        {
          profile_image_url: 'http://tp3.sinaimg.cn/3704303362/50/5731726065/0'
        },
        {
          profile_image_url: 'http://tp2.sinaimg.cn/3178541805/50/5718597241/1'
        },
        {
          profile_image_url: 'http://tva3.sinaimg.cn/crop.0.6.264.264.180/93276e1fjw8f5c6ob1pmpj207g07jaa5.jpg'
        }
      ],
      screen_name: '六六大顺',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: 'Miss_伍：天苍苍，野茫茫，风吹草低见牛羊'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp4.sinaimg.cn/1448595507/50/22871434059/1' 
        },
        { 
          profile_image_url: 'http://tp3.sinaimg.cn/2630646082/50/40073330660/1' 
        },
        { 
          profile_image_url: 'http://tp1.sinaimg.cn/2236171720/50/5733018646/0' 
        },
        {
          profile_image_url: 'http://tp3.sinaimg.cn/3704303362/50/5731726065/0'
        },
        {
          profile_image_url: 'http://tp2.sinaimg.cn/3178541805/50/5718597241/1'
        },
        {
          profile_image_url: 'http://tva3.sinaimg.cn/crop.0.6.264.264.180/93276e1fjw8f5c6ob1pmpj207g07jaa5.jpg'
        },
        {
          profile_image_url: 'https://tvax2.sinaimg.cn/crop.0.0.750.750.180/005ATVcYly8fiuncraf1tj30ku0ku3zh.jpg'
        }
      ],
      screen_name: '七星高照',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: 'Mike：人不能低下高贵的头颅，但捡钱时例外'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp4.sinaimg.cn/1448595507/50/22871434059/1' 
        },
        { 
          profile_image_url: 'http://tp3.sinaimg.cn/2630646082/50/40073330660/1' 
        },
        { 
          profile_image_url: 'http://tp1.sinaimg.cn/2236171720/50/5733018646/0' 
        },
        {
          profile_image_url: 'http://tp3.sinaimg.cn/3704303362/50/5731726065/0'
        },
        {
          profile_image_url: 'http://tp2.sinaimg.cn/3178541805/50/5718597241/1'
        },
        {
          profile_image_url: 'http://tva3.sinaimg.cn/crop.0.6.264.264.180/93276e1fjw8f5c6ob1pmpj207g07jaa5.jpg'
        },
        {
          profile_image_url: 'https://tvax2.sinaimg.cn/crop.0.0.750.750.180/005ATVcYly8fiuncraf1tj30ku0ku3zh.jpg'
        },
        {
          profile_image_url: 'http://tp1.sinaimg.cn/1869807504/50/40095858411/1'
        }
      ],
      screen_name: '八面玲珑',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '露娜：八星八钻，走过路过别错过'
    },
    {
      avatars: [
        { 
          profile_image_url: 'http://tp4.sinaimg.cn/1448595507/50/22871434059/1' 
        },
        { 
          profile_image_url: 'http://tp3.sinaimg.cn/2630646082/50/40073330660/1' 
        },
        { 
          profile_image_url: 'http://tp1.sinaimg.cn/2236171720/50/5733018646/0' 
        },
        {
          profile_image_url: 'http://tp3.sinaimg.cn/3704303362/50/5731726065/0'
        },
        {
          profile_image_url: 'http://tp2.sinaimg.cn/3178541805/50/5718597241/1'
        },
        {
          profile_image_url: 'http://tva3.sinaimg.cn/crop.0.6.264.264.180/93276e1fjw8f5c6ob1pmpj207g07jaa5.jpg'
        },
        {
          profile_image_url: 'https://tvax2.sinaimg.cn/crop.0.0.750.750.180/005ATVcYly8fiuncraf1tj30ku0ku3zh.jpg'
        },
        {
          profile_image_url: 'http://tp1.sinaimg.cn/1869807504/50/40095858411/1'
        },
        {
          profile_image_url: 'https://tva4.sinaimg.cn/crop.0.0.179.179.180/5306c1d3gw1egsy6otv01j2050050aag.jpg'
        }
      ],
      screen_name: '九九归一',
      created_at: 'Tue Apr 09 00:05:03 +0800 2019',
      text: '小书包：一一得一，九九八十一'
    }
  ]
}