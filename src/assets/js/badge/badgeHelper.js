// 处理badge的工具类
export default (badge) => {
  // 容错处理
  if (!badge) {
    return {
      type: '',
      value: 0,
      text: '',
      show: false,
      dot: false
    }
  }

  let type = badge.type
  let value = badge.value * 1
  let text = ''
  let show = false
  let dot = false
  if (type === 'new' && value > 0) {
    text = 'NEW'
    show = true
    dot = false
  } else if (type === 'digit' && value > 0) {
    text = value + ''
    show = true
    dot = false
  } else if (type === 'dot' && value > 0) {
    text = ''
    show = true
    dot = true
  } else if (type === 'none' && value > 0) {
    text = ''
    show = true
    dot = true
  }
  return {
    type: type,
    value: value,
    text: text,
    show: show,
    dot: dot
  }

}