const fs = require('fs');
const path = require('path');
const s4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 获取随机 uuid
 * @returns {string}
 */
const uuid = () => {
  return (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
}


/**
 * 将毫秒转换为更合适显示的时间数字和单位
 * @param {number} timeInMs 
 * @returns {{
 *   resultTime: number;
 *   unit: 'ms' | 'sec' | 'min' | 'hour';
 * }}
 */
const prettyTime = (timeInMs) => {
  let result = 0
  let unit = 'ms'
  if (timeInMs < 1000) {
    result = timeInMs
  } else if (timeInMs < 60 * 1000) {
    result = timeInMs / 1000
    unit = 'sec'
  } else if (timeInMs < 60 * 60 * 1000) {
    result = timeInMs / (60 * 1000)
    unit = 'min'
  } else {
    result = timeInMs / (60 * 60 * 1000)
    unit = 'hour'
  }
  return {
    resultTime: result,
    unit
  }
}
//根据文件，同步递归创建其上一级目录
function createDirs(file) {
  //获取文件根目录
  let dirpath = path.dirname(file);
  //有路径直接回调走
  if (fs.existsSync(dirpath)) {
    return true;
  } else {
    if (createDirs(dirpath)) {
      try {
        // 并发时有问题，查询时无，创建时别的子进程已经创建
        fs.mkdirSync(dirpath);
      } catch {

      }
      return true;
    }
  }
};

module.exports = {
  uuid, prettyTime,createDirs
}