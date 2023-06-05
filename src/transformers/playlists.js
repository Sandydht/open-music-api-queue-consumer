const songsTransform = require('./songs');

const playlistWithSongsList = (data) => ({
  id: data && data.id,
  name: data && data.name,
  songs: data && data.songs && Array.isArray(data.songs) && data.songs.length > 0
    ? songsTransform.songList(data.songs) : [],
});

const transformer = {};
transformer.playlistWithSongs = (datas) => datas.map((data) => playlistWithSongsList(data));

module.exports = transformer;
