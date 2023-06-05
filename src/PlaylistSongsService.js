const { Pool } = require('pg');
const songsTransform = require('./transformers/songs');

class PlaylistSongsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistSongsByPlaylistId(playlistId) {
    const query = {
      text: 'SELECT songs.* FROM songs INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id WHERE playlist_songs.playlist_id = $1 GROUP BY songs.id',
      values: [playlistId],
    };

    const playlistSongs = await this.pool.query(query);
    const result = songsTransform.songList(playlistSongs.rows);
    return result;
  }
}

module.exports = PlaylistSongsService;
