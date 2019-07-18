

export function formatDiscInfo(platform, data) {
  let Disc = {};
  if (platform === 'tencent') {
    Disc.name = data[0].dissname;
    Disc.id = data[0].dissid;
    Disc.desc = data[0].desc;
    Disc.pic = data[0].logo;
    Disc.author = data[0].nickname
  } else if (platform === 'netease') {
    Disc.name = data.name;
    Disc.id = data.id;
    Disc.desc = data.description;
    Disc.pic = data.coverImgUrl;
    Disc.author = data.creator.nickname
  }
  return Disc;
}

export function formatDiscs(platform, data) {
  let Disc = [];
  let songs = {};
  if (platform === 'tencent') {
    songs = data.list;
    for (let index in songs) {
      let item = {};
      item.author = songs[index].creator.name;
      item.id = songs[index].dissid;
      item.disName = songs[index].dissname;
      item.dissPic = songs[index].imgurl;
      item.source = platform;
      // console.log(index);
      Disc[index] = item;
    }

  } else if (platform === 'netease') {
    songs = data;
    for (let index in songs) {
      let item = {};
      item.author = songs[index].creator.nickname;
      item.id = songs[index].id;
      item.disName = songs[index].name;
      item.dissPic = songs[index].coverImgUrl;
      item.source = platform;
      Disc[index] = item;
    }
  }
  return Disc;
}


export function formatSongs(platform, data) {
  let songs = {};
  let list = [];
  if (platform === 'tencent') {
    songs = data[0].songlist;
    for (let index in songs) {
      let item = {};
      item.singer = songs[index].singer[0].name;
      item.id = songs[index].mid;
      item.songName = songs[index].name;
      item.album = songs[index].album.name;
      item.source = platform;
      list[index] = item;
    }

  } else if (platform === 'netease') {
    songs = data.tracks;
    for (let index in songs) {
      let item = {};
      item.singer = songs[index].artists[0].name;
      item.id = songs[index].id;
      item.songName = songs[index].name;
      item.album = songs[index].album.name;
      item.source = platform;
      list[index] = item;
    }
  }
  return list;
}
