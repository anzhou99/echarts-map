//本地址仅供测试demo用，部署时请切换成自己的服务器地址
const JSON_URL = 'https://cdn.jsdelivr.net/gh/AnZhou99/geoJsons';

function getJson(adcode) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${JSON_URL}/${adcode}_full.json`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        console.log('geoJson获取失败: ', err);
        reject('');
      });
  });
}

export default getJson;
