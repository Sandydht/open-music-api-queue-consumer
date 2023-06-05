const autoBind = require('auto-bind');
const mapDbToModel = require('./utils/mapDbToModel');
const playlistsTransform = require('./transformers/playlists');

class Listener {
  constructor(playlistsService, playlistSongsService, mailSender) {
    this.playlistsService = playlistsService;
    this.playlistSongsService = playlistSongsService;
    this.mailSender = mailSender;
    autoBind(this);
  }

  async listen(message) {
    try {
      const { userId, targetEmail } = JSON.parse(message.content.toString());

      const [playlists, playlistSongs] = await Promise.all([
        this.playlistsService.getPlaylists(userId),
        this.playlistSongsService.getPlaylistSongsByUserId(userId),
      ]);

      const mapDbResult = mapDbToModel(playlists, playlistSongs);
      const playlistWithSongs = playlistsTransform.playlistWithSongs(mapDbResult);

      const result = await this.mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlistWithSongs),
      );
      // eslint-disable-next-line no-console
      console.log(result);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

module.exports = Listener;
