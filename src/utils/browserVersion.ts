export default function browserVersion() {
  var userAgent = navigator.userAgent //取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 //判断是否IE<11浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE //Edge浏览器
  var isFirefox = userAgent.indexOf('Firefox') > -1 //Firefox浏览器
  var isOpera = userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1 //Opera浏览器
  var isChrome =
    userAgent.indexOf('Chrome') > -1 &&
    userAgent.indexOf('Safari') > -1 &&
    userAgent.indexOf('Edge') == -1 &&
    userAgent.indexOf('OPR') == -1 //Chrome浏览器
  var isSafari =
    userAgent.indexOf('Safari') > -1 &&
    userAgent.indexOf('Chrome') == -1 &&
    userAgent.indexOf('Edge') == -1 &&
    userAgent.indexOf('OPR') == -1 //Safari浏览器
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion == 7) {
      return 'IE:7'
    } else if (fIEVersion == 8) {
      return 'IE:8'
    } else if (fIEVersion == 9) {
      return 'IE:9'
    } else if (fIEVersion == 10) {
      return 'IE:10'
    } else {
      return 'IE:6' //IE版本<7
    }
  } else if (isIE11) {
    return 'IE:11'
  } else if (isEdge) {
    return 'Edge:' + userAgent.split('Edge/')[1].split('.')[0]
  } else if (isFirefox) {
    return 'Firefox:' + userAgent.split('Firefox/')[1].split('.')[0]
  } else if (isOpera) {
    return 'Opera:' + userAgent.split('OPR/')[1].split('.')[0]
  } else if (isChrome) {
    return 'Chrome:' + userAgent.split('Chrome/')[1].split('.')[0]
  } else if (isSafari) {
    return 'Safari:' + userAgent.split('Safari/')[1].split('.')[0]
  } else {
    return -1 //不是ie浏览器
  }
}

export function isChromeOrEdge() {
  const limitObj = {
    Edge: 86,
    Chrome: 86
  }
  const browser = browserVersion()
  if (typeof browser === 'string') {
    const browserVersionStr = browser.split(':')
    const name = browserVersionStr[0]
    const version = browserVersionStr[1]

    if (
      limitObj.hasOwnProperty(name) &&
      version >= Object.getOwnPropertyDescriptor(limitObj, name)?.value
    ) {
      return true
    }
    return false
  }
}
