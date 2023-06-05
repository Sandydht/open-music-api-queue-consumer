const { Pool } = require('pg');
const playlistsTransform = require('./transformers/playlists');

class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async getPlaylistById(id) {
    const query = {
      text: 'SELECT * FROM users INNER JOIN playlists ON users.id = playlists.owner WHERE playlists.id = $1',
      values: [id],
    };

    const playlist = await this.pool.query(query);
    const result = playlistsTransform.showPlaylist(playlist.rows[0]);
    return result;
  }
}

module.exports = PlaylistsService;
