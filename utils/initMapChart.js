/*
 * @Author: 汝星星
 * @Date: 2021-09-15 14:52:35
 * @Description: 加载echarts地图
 */

function initMapChart({ mapIns, mapDom, mapJson, mapOption }) {
  !mapIns && (mapIns = echarts.init(mapDom));

  echarts.registerMap('统计地图', mapJson);

  mapIns.off('click');

  mapIns.on('click', async params => {
    watcher.adcode = cityMapByName[params.name];
  });

  mapIns.setOption(mapOption);
}

export default initMapChart;
