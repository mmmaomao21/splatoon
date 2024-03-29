const app = getApp()

const gameTypeMap = {
  regular: '通常比赛',
  salmon: '鲑鱼打工',
  league: '联盟比赛',
  ranked: '真格比赛'
}

const stageNameMap = {
  "Camp Triggerfish": '营地',
  "Moray Towers": '停车场',
  "Inkblot Art Academy": '海女美术大学',
  "New Albacore Hotel": '酒店',
  "Musselforge Fitness": '健身房',
  "Ancho-V Games": '游戏公司',
  "Starfish Mainstage": '野外音乐堂',
  "Humpback Pump Track": '赛车场',
  "Piranha Pit": '矿山',
  "Shellendorf Institute": '海洋博物馆',
  "Manta Maria": '玛丽亚轮船',
  "Arowana Mall": '商业街',
  "Walleye Warehouse": '仓库',
  "Snapper Canal": '河川',
  "Kelp Dome": '农园',
  "Sturgeon Shipyard": '造船厂',
  "Port Mackerel": '码头',
  "Blackbelly Skatepark": '滑板公园',
  "Skipper Pavilion": '神社',
  "The Reef": '寿司街',
  "MakoMart": '超市',
  "Goby Arena": '篮球场',
  "Wahoo World": '游乐场',
}

const modeMap = {
  'rainmaker': '鱼',
  'clam_blitz': '蛤蜊',
  'splat_zones': '区域',
  'tower_control': '塔'
}

const formatDate = (str) => {
  let time = new Date(str * 1000);
  return `${((time.getMonth() + 1))}月${(time.getDate())}日${("0" + time.getHours()).slice(-2)}:00`;
}

module.exports = {
  gameTypeMap,
  formatDate,
  stageNameMap,
  modeMap
}