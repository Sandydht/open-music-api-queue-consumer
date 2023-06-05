const filterPlaylistSongs = (playlistId, playlistSongs) => {
  const result = playlistSongs.filter((playlistSong) => (
    playlistSong?.playlist_id?.toString() === playlistId?.toString()
  ));
  return result;
};

const mapDbToModel = (playlists, playlistSongs) => {
  let data = [];
  if (Array.isArray(playlistSongs) && playlistSongs.length > 0) {
    if (Array.isArray(playlists) && playlists.length > 0) {
      playlists.forEach((playlist) => {
        // eslint-disable-next-line no-param-reassign
        playlist.songs = filterPlaylistSongs(playlist.id, playlistSongs);
      });
      data = playlists;
    }
  } else {
    data = playlists;
  }

  return data;
};

module.exports = mapDbToModel;
