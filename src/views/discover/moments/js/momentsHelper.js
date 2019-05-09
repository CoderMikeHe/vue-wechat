// 工具类
import utils from '@/assets/utils/utils.js'
// 表情类
import emoticons from '@/assets/js/emoticons/emoticons.js'

// attitudesIcon
let attitudesIcon =
  '<img src=' +
  require('@/assets/images/moments/wx_albumInformationLikeHL_15x15.png') +
  " width='15' height='15'>"

export default {
  // 专门用来处理 朋友圈的业务逻辑

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

  // 对内容做正则处理
  regexContent(text) {
    // 1 链接正则
    // let regexLinkUrl = /(http[s]?:\/\/([\w-]+.)+([:\d+])?(\/[\w-\.\/\?%&=]*)?)/gi;
    let regexLinkUrl = new RegExp(
      '((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)',
      'gi'
    )
    // 匹配到链接数据
    let linkUrlResults = text.match(regexLinkUrl) || []
    // 数组去重
    linkUrlResults = utils.uniqueArray(linkUrlResults)

    // 2 🔥手机或电话正则
    // - [一组匹配中国大陆手机号码的正则表达式](https://github.com/VincentSit/ChinaMobilePhoneNumberRegex)
    // let regexPhoneNumber = /((((13[0-9])|(15[^4])|(18[0,1,2,3,5-9])|(17[0-8])|(147))\d{8})|((\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}))+?/g; // 这个也可以
    let regexPhoneNumber = /((?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[35678]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|66\d{2})\d{6})+?/g
    // 匹配到的电话号码
    let phoneResults = text.match(regexPhoneNumber) || []
    // 数组去重
    phoneResults = utils.uniqueArray(phoneResults)

    // 3 匹配话题 #xxx#
    let regexTopic = /#[^@#]+?#/g
    let topicResults = text.match(regexTopic) || []
    // 数组去重
    topicResults = utils.uniqueArray(topicResults)

    // 3 at @xxx
    let regexAt = /@[-_a-zA-Z0-9\u4E00-\u9FA5]+/g
    let atResults = text.match(regexAt) || []
    // 数组去重
    atResults = utils.uniqueArray(atResults)

    // 4.表情正则 \[[^ \\[\]]+?\]    <PS: 先匹配@，再匹配表情，因为表情里面有 @3x @2x>
    let regexEmoticon = /\[[^ \\[\]]+?\]/g
    // 匹配到表情数据 PS 由于表情是[xxx]，所以不需要去重
    let emoticonResults = text.match(regexEmoticon) || []

    // 做资源拼接
    // 匹配的链接数据
    for (let i = 0; i < linkUrlResults.length; i++) {
      // value
      const value = linkUrlResults[i]
      // 内容
      let el = '<span>' + value + '</span>'
      // 替换
      let regex = new RegExp(value, 'g')
      //
      console.log('链接  ' + regex)
      text = text.replace(regex, el)
    }

    // 匹配的电话号码数据
    for (let i = 0; i < phoneResults.length; i++) {
      // value
      const value = phoneResults[i]
      // 内容
      let el = '<span>' + value + '</span>'
      // 替换
      let regex = new RegExp(value, 'g')
      text = text.replace(regex, el)
    }

    // 匹配的话题数据
    for (let i = 0; i < topicResults.length; i++) {
      // value
      const value = topicResults[i]
      // 内容
      let el = '<span>' + value + '</span>'
      // 替换
      let regex = new RegExp(value, 'g')
      text = text.replace(regex, el)
    }

    // 匹配的@数据
    for (let i = 0; i < atResults.length; i++) {
      // value
      const value = atResults[i]
      // 内容
      let el = '<span>' + value + '</span>'
      // 替换
      let regex = new RegExp(value, 'g')
      text = text.replace(regex, el)
    }

    // 匹配的表情
    for (let i = 0; i < emoticonResults.length; i++) {
      // 匹配到的key
      const key = emoticonResults[i]
      // 取出图片地址
      let src = emoticons[key]
      // 没有表情
      if (!src) continue
      // 图片拼接
      let pic = '<img src=' + "'" + src + "'" + " width='18' height='18'>"
      // 替换
      text = text.replace(key, pic)
    }

    return text
  },

  // 数据web处理
  handleWebDatas(ms) {
    // 数据处理
    let temps = []
    if (!utils.objIsArray(ms)) return temps

    ms.forEach((element, iii) => {
      if (iii === 0) {
        console.log('数据快报')
        console.log(element)
      }
      // 增加辅助属性
      // 全文/收起 <默认让其全部展开，以便获取到文本的最大高度>
      element.unfold = true
      // 是否显示 全文/收起
      element.showUnfold = false
      // 是否显示评论 一进来都不显示
      element.showCmt = false

      // 针对正文做处理
      element.textHtml = this.regexContent(element.text)

      // 1.针对图片处理
      element.pic_infos = element.pic_infos || []
      // 图片盒子的样式 <PS：只需要处理 四张图的场景即可，其他场景靠内部图片撑开>
      element.picsWrapperStyle = {}
      let length = element.pic_infos.length
      if (length > 0) {
        // 先循环一波，配置backgroundImage
        for (let i = 0; i < length; i++) {
          // 取出对象
          let pic = element.pic_infos[i]
          let picStyle = {
            backgroundImage: 'url(' + pic.bmiddle.url + ')'
          }
          // 设置图片样式
          pic.picStyle = picStyle
        }

        // 只处理1张图和4张图的情况
        if (length === 1) {
          // 1张图
          let maxW = 86 * 2 + 12
          let maxH = 180

          // 取出对象
          let pic = element.pic_infos[0]
          let bmiddle = pic.bmiddle

          // 数据处理
          let picW = 0
          let picH = 0
          if (pic.keep_size === 1 || bmiddle.width < 1 || bmiddle.height < 1) {
            /// 固定方形
            picW = picH = maxW
          } else {
            /// 等比显示
            if (bmiddle.width < bmiddle.height) {
              picW = (bmiddle.width / bmiddle.height) * maxH
              picH = maxH
            } else {
              picW = maxW
              picH = (bmiddle.height / bmiddle.width) * maxW
            }
          }
          // 新增属性
          pic.picStyle.width = picW + 'px'
          pic.picStyle.height = picH + 'px'
        } else if (length === 4) {
          // 4张图
          element.picsWrapperStyle.width = 86 * 2 + 2 * 6 + 'px'
        }
      }

      // 点赞列表
      element.attitudes_list = element.attitudes_list || []
      let len1 = element.attitudes_list.length
      // 用来添加地点赞 user
      let attitudes = []
      // 不管有木有点赞，先给我拼个 点赞❤️
      element.attitudesHtml = attitudesIcon
      for (let i = 0; i < len1; i++) {
        // 取出user
        const user = element.attitudes_list[i]
        // 拼接数据
        let screenNameHtml =
          '&nbsp;&nbsp;' + '<span>' + user.screen_name + '</span>'
        // 添加数据
        attitudes.push(screenNameHtml)
      }
      if (attitudes.length > 0) {
        // 用,拼接 默认是按,拼接
        let attitudesHtml = attitudes.join()
        //  辅助属性
        element.attitudesHtml = element.attitudesHtml + attitudesHtml
      }

      // 评论列表
      element.comments_list = element.comments_list || []
      let len2 = element.comments_list.length
      for (let i = 0; i < len2; i++) {
        // 取出comment
        const comment = element.comments_list[i]
        // 评论内容
        let text = '：' + comment.text
        // 来源
        let fromUser = '<span>' + comment.from_user.screen_name + '</span>'
        // 是否有toUser
        let toUser = ''
        if (comment.to_user) {
          toUser = '回复' + '<span>' + comment.to_user.screen_name + '</span>'
        }
        text = this.regexContent(text)
        // 评论内容
        let commentHtml = fromUser + toUser + text
        // 拓展属性
        comment.commentHtml = commentHtml
      }
      // 压栈
      temps.push(element)
    })
    return temps
  }
}
