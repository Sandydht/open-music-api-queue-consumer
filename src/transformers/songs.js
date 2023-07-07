const songList = (data) => ({
  id: data && data.id,
  title: data && data.title,
  performer: data && data.performer,
});

const transformer = {};
transformer.songList = (datas) => datas.map((data) => songList(data));

module.exports = transformer;
