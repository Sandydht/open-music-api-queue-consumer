const playlistDetail = (data) => ({
  id: data && data.id,
  name: data && data.name,
});

const transformer = {};
transformer.showPlaylist = (data) => playlistDetail(data);

module.exports = transformer;
