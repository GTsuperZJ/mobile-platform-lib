import jysdk from '../../index'
import {
  savelog,
  traceLog
} from './request'
let saveLogObj = {
  username: 'username',
  orgCode: 'orgCode',
  pageName: 'pageName',
  subSystem: 'subSystem',
  packageName: 'packageName',
  enterTime: 'enterTime',
  leaveTime: 'leaveTime'
}

let traceReport = {
  userKey: 'phone',
  dataType: 0,
  dataName: 'packageName',
  dataKey: 'to.path',
  fromDataKey: 'from.path',
  originType: 0,
  fromName: 'packageName',
  fromType: 0,
  dataVersion: 'deviceVersionCode',
  fromDeviceOs: 'window.device.platform',
  fromDeviceType: 'window.device.manufacturer' + ' ' + 'window.device.model',
  fromChannel: '',
  extraData: '',
  fromDeviceResolutionRatio: parseInt(screen.availWidth * window.devicePixelRatio) + '*' + parseInt(screen.availHeight * window.devicePixelRatio),
  enterTime: 'enterTime',
  leaveTime: 'leaveTime'
}

let lastPageEnterTime = ''
let lastPageLeaveTime = ''
let mobileLog = ''

export const jy_log = {
  log: ({ to, from }) => {
    window.jyLogTo = to
    window.jyLogFrom = from
    jy_log.handleLog({ to, from })
  },
  handleLog: ({ to, from }) => {
    if (window.jyLogEnterTime && window.jyLogEnterTime == '') {
      lastPageEnterTime = ''
      lastPageEnterTime = jy_log.getNowTime()
    }
    if (to && to.meta && to.meta.log && from && from.meta && !from.meta.log) {
      lastPageEnterTime = ''
      lastPageEnterTime = jy_log.getNowTime()
    }
    if (lastPageEnterTime == '') {
      lastPageEnterTime = jy_log.getNowTime()
    }
    jysdk.state.ready(async () => {
      if (from && from.meta && from.meta.log) {
        mobileLog = await jysdk.nativeApi.jy_storage.getItemAsync('mobileLog')
        let phone = (await jysdk.nativeApi.jy_storage.getItemAsync('userInfo')).userDTO.phone || ''
        let orgCode = (await jysdk.nativeApi.jy_storage.getItemAsync('userInfo')).userDTO.orgCode || ''
        lastPageLeaveTime = jy_log.getNowTime()
        saveLogObj.username = phone
        saveLogObj.orgCode = orgCode
        saveLogObj.pageName = from.meta.page
        saveLogObj.subSystem = from.meta.subsystem
        saveLogObj.packageName = (await jysdk.nativeApi.jy_storage.getItemAsync('$APP_INFO_REPO$')).packageName || ''
        saveLogObj.enterTime = lastPageEnterTime
        saveLogObj.leaveTime = lastPageLeaveTime
        if (mobileLog == '1,2' || mobileLog == '1') {
          savelog(saveLogObj).then(res => {
            if (mobileLog == '2' || mobileLog == '1,2') {
              jy_log.handleTraceLog()
            }
          }).catch(err => {
            if (mobileLog == '2' || mobileLog == '1,2') {
              jy_log.handleTraceLog()
            }
          })
        }
      } else {
      }
    })
  },
  handleTraceLog: () => {
    if (mobileLog != '2' && mobileLog != '1,2') {
      lastPageEnterTime = jy_log.getNowTime()
      window.jyLogEnterTime = lastPageEnterTime
    }
    let deviceVersionCode = (window.AppVersion && window.AppVersion.build) || ''
    let platform = (window.device && window.device.platform) || ''
    let manufacturer = (window.device && window.device.manufacturer) || ''
    let model = (window.device && window.device.model) || ''
    traceReport.userKey = saveLogObj.username
    traceReport.dataName = saveLogObj.packageName
    traceReport.dataKey = saveLogObj.pageName
    traceReport.fromDataKey = saveLogObj.pageName
    traceReport.fromName = saveLogObj.packageName
    traceReport.dataVersion = deviceVersionCode
    traceReport.fromDeviceOs = platform
    traceReport.fromDeviceType = manufacturer ? manufacturer.toString().concat(' ' + model) : (model || '')
    traceReport.fromDeviceResolutionRatio = parseInt(screen.availWidth * window.devicePixelRatio) + '*' + parseInt(screen.availHeight * window.devicePixelRatio)
    traceReport.enterTime = saveLogObj.enterTime
    traceReport.leaveTime = saveLogObj.leaveTime
    traceLog(traceReport).then(res => {
    }).catch(err => {
    })
  },
  getNowTime: () => {
    return format(new Date(), 'yyyy-MM-dd hh:mm:ss') // 进入时间(前页面离开时间和后面进入时间)
  }
}

var format = function (date, fm) {
  var d
  if (typeof date === 'string') {
    var n = date.match(/[+-]?\d+/)
    if (n) {
      d = new Date(parseInt(n[0]))
    } else {
      return ''
    }
  } else if (typeof date === 'number') {
    d = new Date(date)
  } else if (date instanceof Date) {
    d = date
  } else {
    return ''
  }
  var o = {
    'M+': d.getMonth() + 1, // 月份
    'd+': d.getDate(), // 日
    'h+': d.getHours(), // 小时
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds(), // 秒
    'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
    'S': d.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fm)) {
    fm = fm.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fm)) {
      fm = fm.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fm
}

export const apiInstaller = () => {
  return {
    name: 'jy_log',
    api: jy_log,
  }
}