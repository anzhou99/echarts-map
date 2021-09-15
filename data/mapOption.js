const mapOption = {
  tooltip: {
    show: true,
    trigger: 'item',
    formatter(v) {
      return `${v.name}`;
    },
    backgroundColor: 'rgba(0,0,0,.5)',
    borderColor: 'transparent',
    textStyle: {
      color: '#fff',
      fontSize: '14',
    },
  },

  series: [
    {
      layoutCenter: ['50%', '50%'],
      layoutSize: '100%',
      type: 'map',
      map: '统计地图',
      roam: true,
      zoom: 1,
      center: null,
      itemStyle: {
        borderWidth: '2',
        color: 'green',
        borderColor: '#fff',
      },
      emphasis: {
        label: {
          show: false,
        },
      },
      select: {
        label: {
          show: false,
        },
      },
      data: [],
    },
  ],
};

export default mapOption;
