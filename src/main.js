/*
 * @Author: AnZhou
 * @FileName: main.js
 * @Description: 入口文件
 */
import cityMapByName from '../assets/json/cityMapByNameSimple.json';
import cityMapByCode from '../assets/json/cityMapByCodeSimple.json';
import STATIC_DATA from '../data/staticData';
import mapOption from '../data/mapOption';
import getJson from '../request/getJson';
import judgeArea from '../utils/judgeArea';

let mapIns = null; //echarts实例

let mapDom = document.getElementById('chart-map'); //地图容器
let backBtnDom = document.getElementById('back-btn'); //返回父级按钮

let prevAdcode = null; //父级adcode
let areaInfo = {}; //当前区域的具体信息，详见../utils/judgeArea
/**
 * tips--start
 * 如下三项name在此demo中无用，但实际中很可能会遇到，故保留
 * 如果你的项目中不需要，可自行删除相应代码
/** tips--end */
let provName = null; //当前区域所在的省份全称，如无则为null
let cityName = null; //当前区域所在的省份全称，如无则为null
let districtName = null; //当前区域所在的省份全称，如无则为null

//核心监听对象
let watcher = new Proxy(
  {
    adcode: null, //当前区域的adcode
  },
  {
    get(target, key) {
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;

      // 获取当前区域的具体信息
      areaInfo = judgeArea(watcher.adcode);

      //获取省市区三级全称(如需)
      getNames();

      mapController();

      backBtnController();

      return true;
    },
  }
);

//控制地图生成
function mapController() {
  /**
   * tips--start
   * 1. 仅当地图等级为国家级、省级、市级时可点击下钻
   * 2. 直辖市、澳门、香港、台湾较为特殊，只展示两级
  /** tips--end */
  if ([0, 1].includes(areaInfo.districtRank)) {
    //国家、省级时
    prevAdcode = STATIC_DATA.CHINA_ADCODE;
    pipeLine();
  } else if ([2, 3].includes(areaInfo.districtRank)) {
    //当前区域为市、区级时
    if (areaInfo.isSpecialArea) {
      //特殊地区的父级为中国
      prevAdcode = STATIC_DATA.CHINA_ADCODE;
    } else {
      //其余父级为所在省、自治区
      prevAdcode = areaInfo.provAdcode;
    }
    //仅点击市级可下钻
    areaInfo.districtRank == 2 && pipeLine();
  }
}

//控制返回按钮样式
function backBtnController() {
  backBtnDom.style.display = areaInfo.districtRank == 0 ? 'none' : 'inline-flex';
}

// 通过cityMapByCode中的json查询相应地区的省、市、区名称
function getNames() {
  /**
   * tips--start
   * 如果你的项目中不需要省市县全称，请可自行删除以下代码
   * 并删除顶部引用的cityMapByCode静态json
   */
  /** tips--end */
  [provName, cityName, districtName] = [
    areaInfo.provAdcode ? cityMapByCode[areaInfo.provAdcode] : '',
    areaInfo.cityAdcode ? cityMapByCode[areaInfo.cityAdcode] : '',
    areaInfo.districtAdcode ? cityMapByCode[areaInfo.districtAdcode] : '',
  ];
}

//注册生成echarts地图、绑定点击事件
function initMapChart({ mapDom, mapJson, mapOption }) {
  if (!mapIns) {
    mapIns = echarts.init(mapDom);

    mapIns.off('click');

    mapIns.on('click', async params => {
      watcher.adcode = cityMapByName[params.name];
    });
  }

  echarts.registerMap('统计地图', mapJson);

  mapIns.setOption(mapOption);
}

//总线
async function pipeLine() {
  //异步获取geojson
  const mapJson = await getJson(watcher.adcode);

  initMapChart({ mapDom, mapJson, mapOption });
}

//设置容器样式
mapDom.style.width = '100%';
mapDom.style.height = window.innerHeight - 56 * 2 + 'px';
//绑定返回事件
backBtnDom.addEventListener('click', () => {
  watcher.adcode = prevAdcode;
});

//初始化地图
watcher.adcode = '100000';
