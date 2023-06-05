const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistSongsByUserId(userId) {
    const query = {
      text: 'SELECT songs.id, songs.title, songs.performer, playlist_songs.playlist_id FROM songs LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id LEFT JOIN playlists ON playlists.id = playlist_songs.playlist_id LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id WHERE playlists.owner = $1 OR collaborations.user_id = $1',
      values: [userId],
    };

    const result = await this.pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistSongsService;
