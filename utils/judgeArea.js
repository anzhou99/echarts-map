/*
 * @Author: AnZhou
 * @FileName: judgeArea.js
 * @Description: 地区信息计算函数
 */
import STATIC_DATA from '../data/staticData';

let [provAdcode, cityAdcode, districtAdcode, districtRank, isSpecialArea] = [
  ...Array(4).fill(null),
  false,
];

function judgeArea(adcode) {
  /*
   *  根据国家标准《中华人民共和国行政区划代码》
   *  标准号GB/T 2260-2007
   *  adcode代码由六位组成
   *  前两位表省、自治区级
   *  中两位表市州级
   *  后两位表区县级
   */

  adcode = adcode + '';

  let result = null;
  if (adcode === '100000') {
    //展示地图为中国
    result = [...Array(3).fill(null), 0, false];
  } else if (/^\d{2}0{4}$/.test(adcode)) {
    //展示地图为省、自治区级
    if (STATIC_DATA.SPECIAL_AREA.includes(adcode)) {
      //省级-特殊地区
      result = [adcode, adcode, null, 1, true];
    } else {
      //省
      result = [adcode, null, null, 1, false];
    }
  } else if (/^\d{4}0{2}$/.test(adcode)) {
    //展示地图为市州级
    result = [adcode.substring(0, 2) + '0000', adcode, null, 2, isSpecialArea];
  } else {
    //展示地图(选中区域为)区县级
    result = [
      adcode.substring(0, 2) + '0000',
      adcode.substring(0, 4) + '00',
      adcode,
      3,
      isSpecialArea,
    ];
  }

  [provAdcode, cityAdcode, districtAdcode, districtRank, isSpecialArea] = result;

  return {
    provAdcode, //省级adcode
    cityAdcode, //市级adcode
    districtAdcode, //区级adcode
    districtRank, //当前地图等级：0-国 1-省 2-市 3-区
    isSpecialArea, //是否特殊地区
  };
}

export default judgeArea;
